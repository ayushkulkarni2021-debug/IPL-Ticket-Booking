import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import MatchCard from "./MatchCard";
import BookingModal from "./BookingModal";
import "./MatchList.css";

const ALL_TEAMS = ["ALL", "CSK", "MI", "RCB", "KKR", "RR", "SRH"];

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [toast, setToast] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeMatch, setActiveMatch] = useState(null);

  function showToast(message) {
    setToast(message);
    setTimeout(function () {
      setToast("");
    }, 3500);
  }

  // Step 3: fetch matches from Supabase on mount
  useEffect(function () {
    async function fetchMatches() {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError("Could not load matches: " + error.message);
      } else {
        setMatches(data);
      }
      setLoading(false);
    }
    fetchMatches();
  }, []);

  // Step 5: realtime subscription — UI updates when the matches table changes
  useEffect(function () {
    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        function (payload) {
          if (payload.eventType === "INSERT") {
            setMatches(function (prev) {
              return prev.some(function (m) { return m.id === payload.new.id; })
                ? prev
                : [...prev, payload.new];
            });
          } else if (payload.eventType === "UPDATE") {
            setMatches(function (prev) {
              return prev.map(function (m) {
                return m.id === payload.new.id ? payload.new : m;
              });
            });
          } else if (payload.eventType === "DELETE") {
            setMatches(function (prev) {
              return prev.filter(function (m) { return m.id !== payload.old.id; });
            });
          }
        }
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredMatches = matches.filter(function (match) {
    if (selectedTeam === "ALL") return true;
    return match.team_codes.includes(selectedTeam);
  });

  // Step 4: book tickets — reserve seats (update), then record the booking (insert)
  async function confirmBooking(match, form) {
    const seatsLeft = match.available_seats - form.quantity;
    if (seatsLeft < 0) {
      return "Only " + match.available_seats + " seats left for this match.";
    }

    // Reserve seats. The .eq on available_seats makes sure nobody else
    // booked in the meantime; if they did, no row is updated.
    const { data: updated, error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: seatsLeft })
      .eq("id", match.id)
      .eq("available_seats", match.available_seats)
      .select();

    if (updateError) return "Could not update seats: " + updateError.message;
    if (!updated || updated.length === 0) {
      return "Seats just changed — please try again.";
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      match_id: match.id,
      customer_name: form.name,
      email: form.email,
      ticket_type: form.ticketType,
      quantity: form.quantity,
      total_price: form.total,
    });

    if (insertError) {
      // Roll the seats back if the booking could not be saved
      await supabase
        .from("matches")
        .update({ available_seats: match.available_seats })
        .eq("id", match.id);
      return "Could not save booking: " + insertError.message;
    }

    setActiveMatch(null);
    showToast("Booked " + form.quantity + " ticket(s) for " + match.teams + "!");
    return "";
  }

  return (
    <section id="matches" className="matches-section">
      <h2>Match Schedule</h2>

      <div className="matches-controls">
        <div className="filter-group">
          <label htmlFor="teamFilter">Filter by Team:</label>
          <select
            id="teamFilter"
            value={selectedTeam}
            onChange={function (e) { setSelectedTeam(e.target.value); }}
          >
            {ALL_TEAMS.map(function (team) {
              return (
                <option key={team} value={team}>
                  {team === "ALL" ? "All Teams" : team}
                </option>
              );
            })}
          </select>
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={`view-btn${viewMode === "grid" ? " active" : ""}`}
            onClick={function () { setViewMode("grid"); }}
          >
            Grid View
          </button>
          <button
            type="button"
            className={`view-btn${viewMode === "list" ? " active" : ""}`}
            onClick={function () { setViewMode("list"); }}
          >
            List View
          </button>
        </div>
      </div>

      {loading && <p className="no-results">Loading matches...</p>}
      {error && <p className="no-results">{error}</p>}

      {!loading && !error && filteredMatches.length === 0 && (
        <p className="no-results">No matches found for {selectedTeam}.</p>
      )}

      {!loading && !error && filteredMatches.length > 0 && (
        <div className={`match-grid${viewMode === "list" ? " list-view" : ""}`}>
          {filteredMatches.map(function (match) {
            return (
              <MatchCard
                key={match.id}
                match={match}
                onBook={function () { setActiveMatch(match); }}
              />
            );
          })}
        </div>
      )}

      {activeMatch && (
        <BookingModal
          match={matches.find(function (m) { return m.id === activeMatch.id; }) || activeMatch}
          onClose={function () { setActiveMatch(null); }}
          onConfirm={confirmBooking}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default MatchList;
