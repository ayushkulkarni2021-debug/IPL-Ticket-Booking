import { useState } from "react";
import MatchCard from "./MatchCard";
import "./MatchList.css";

// Match data — in a real app this could come from an API or parent prop
const MATCHES = [
  {
    id: 1,
    teams: "CSK vs MI",
    teamCodes: ["CSK", "MI"],
    date: "15 April, 7:30 PM",
    venue: "MA Chidambaram Stadium, Chennai",
    prices: { General: 800, Premium: 2000, VIP: 5000 },
  },
  {
    id: 2,
    teams: "RCB vs KKR",
    teamCodes: ["RCB", "KKR"],
    date: "18 April, 7:30 PM",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    prices: { General: 1000, Premium: 2500, VIP: 6000 },
  },
  {
    id: 3,
    teams: "RR vs SRH",
    teamCodes: ["RR", "SRH"],
    date: "21 April, 7:30 PM",
    venue: "Sawai Mansingh Stadium, Jaipur",
    prices: { General: 750, Premium: 1800, VIP: 4500 },
  },
  {
    id: 4,
    teams: "MI vs RCB",
    teamCodes: ["MI", "RCB"],
    date: "25 April, 7:30 PM",
    venue: "Wankhede Stadium, Mumbai",
    prices: { General: 1200, Premium: 3000, VIP: 7000 },
  },
];

const ALL_TEAMS = ["ALL", "CSK", "MI", "RCB", "KKR", "RR", "SRH"];

// MatchList component: renders all MatchCard components.
// Uses useState for the team filter and selected match.
function MatchList() {
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [toast, setToast] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Filter matches by selected team
  const filteredMatches = MATCHES.filter(function (match) {
    if (selectedTeam === "ALL") return true;
    return match.teamCodes.includes(selectedTeam);
  });

  function handleFilterChange(e) {
    setSelectedTeam(e.target.value);
  }

  function handleBook(matchName) {
    setToast("Opening booking for " + matchName + "!");
    setTimeout(function () {
      setToast("");
    }, 3000);
    // Scroll to booking section
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section id="matches" className="matches-section">
      <h2>Match Schedule</h2>

      {/* Controls: Filter + Grid/List toggle */}
      <div className="matches-controls">
        <div className="filter-group">
          <label htmlFor="teamFilter">Filter by Team:</label>
          <select
            id="teamFilter"
            value={selectedTeam}
            onChange={handleFilterChange}
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

      {/* Match cards rendered by mapping over filtered data */}
      {filteredMatches.length === 0 ? (
        <p className="no-results">No matches found for {selectedTeam}.</p>
      ) : (
        <div className={`match-grid${viewMode === "list" ? " list-view" : ""}`}>
          {filteredMatches.map(function (match) {
            return (
              <MatchCard
                key={match.id}
                matchNumber={match.id}
                teams={match.teams}
                date={match.date}
                venue={match.venue}
                prices={match.prices}
                onBook={handleBook}
              />
            );
          })}
        </div>
      )}

      {/* Toast notification */}
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default MatchList;
