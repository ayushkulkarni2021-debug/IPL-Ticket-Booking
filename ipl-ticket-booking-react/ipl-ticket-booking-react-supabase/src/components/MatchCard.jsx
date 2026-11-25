import "./MatchCard.css";

// Displays one match row coming from the Supabase `matches` table.
function MatchCard({ match, onBook }) {
  const soldOut = match.available_seats <= 0;

  return (
    <article className="match-card">
      <div className="match-card-header">
        <span className="match-badge">Match {match.id}</span>
        <h3>{match.teams}</h3>
      </div>

      <div className="match-card-meta">
        <p><strong>Date &amp; Time:</strong> {match.match_date}</p>
        <p><strong>Venue:</strong> {match.venue}</p>
        <p><strong>Seats left:</strong> {match.available_seats}</p>
      </div>

      <div className="match-prices">
        <span>General: ₹{match.price_general}</span>
        <span>Premium: ₹{match.price_premium}</span>
        <span>VIP: ₹{match.price_vip}</span>
      </div>

      <button
        type="button"
        className="btn book-btn"
        disabled={soldOut}
        onClick={onBook}
      >
        {soldOut ? "Sold Out" : "Book"}
      </button>
    </article>
  );
}

export default MatchCard;
