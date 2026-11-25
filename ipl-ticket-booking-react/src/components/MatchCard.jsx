import "./MatchCard.css";

// MatchCard component: displays details for a single IPL match.
// Receives all match data via props — no hardcoded values inside.
function MatchCard({ matchNumber, teams, date, venue, prices, onBook }) {
  return (
    <article className="match-card">
      <div className="match-card-header">
        <span className="match-badge">Match {matchNumber}</span>
        <h3>{teams}</h3>
      </div>

      <div className="match-card-meta">
        <p><strong>Date &amp; Time:</strong> {date}</p>
        <p><strong>Venue:</strong> {venue}</p>
      </div>

      <div className="match-prices">
        <span>General: ₹{prices.General}</span>
        <span>Premium: ₹{prices.Premium}</span>
        <span>VIP: ₹{prices.VIP}</span>
      </div>

      <button
        type="button"
        className="btn book-btn"
        onClick={function () {
          onBook(teams);
        }}
      >
        Book
      </button>
    </article>
  );
}

export default MatchCard;
