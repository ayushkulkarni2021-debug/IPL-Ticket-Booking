import { useState } from "react";
import "./BookingModal.css";

function BookingModal({ match, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const prices = {
    General: match.price_general,
    Premium: match.price_premium,
    VIP: match.price_vip,
  };
  const total = prices[ticketType] * quantity;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setMessage("Please enter your name and email.");
      return;
    }
    setSaving(true);
    setMessage("");
    const result = await onConfirm(match, {
      name: name.trim(),
      email: email.trim(),
      ticketType,
      quantity,
      total,
    });
    if (result) {
      setMessage(result);
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={function (e) { e.stopPropagation(); }}
        onSubmit={handleSubmit}
      >
        <h3>Book: {match.teams}</h3>
        <p className="modal-sub">{match.match_date} · {match.venue}</p>
        <p className="modal-sub">Seats left: {match.available_seats}</p>

        <label>
          Name
          <input value={name} onChange={function (e) { setName(e.target.value); }} />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
          />
        </label>
        <label>
          Ticket type
          <select value={ticketType} onChange={function (e) { setTicketType(e.target.value); }}>
            <option value="General">General (₹{prices.General})</option>
            <option value="Premium">Premium (₹{prices.Premium})</option>
            <option value="VIP">VIP (₹{prices.VIP})</option>
          </select>
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max={Math.min(10, match.available_seats)}
            value={quantity}
            onChange={function (e) { setQuantity(Math.max(1, Number(e.target.value) || 1)); }}
          />
        </label>

        <p className="modal-total">Total: ₹{total}</p>
        {message && <p className="modal-error">{message}</p>}

        <div className="modal-actions">
          <button type="button" className="btn modal-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingModal;
