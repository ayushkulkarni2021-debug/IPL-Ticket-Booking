import { useState } from "react";
import "./BookingModal.css";

function BookingModal({ match, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const total = match.prices[ticketType] * quantity;

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setMessage("Please enter your name and email.");
      return;
    }

    setSaving(true);
    setMessage("");
    const error = onConfirm(match, {
      name: name.trim(),
      email: email.trim(),
      ticketType,
      quantity,
      total,
    });
    if (error) {
      setMessage(error);
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={function (event) { event.stopPropagation(); }}
        onSubmit={handleSubmit}
      >
        <h3>Book: {match.teams}</h3>
        <p className="modal-sub">{match.date} · {match.venue}</p>
        <p className="modal-notice">
          Demo only: booking details are saved in this browser and do not reserve real seats.
        </p>

        <label>
          Name
          <input
            required
            value={name}
            onChange={function (event) { setName(event.target.value); }}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={function (event) { setEmail(event.target.value); }}
          />
        </label>
        <label>
          Ticket type
          <select
            value={ticketType}
            onChange={function (event) { setTicketType(event.target.value); }}
          >
            {Object.entries(match.prices).map(function ([type, price]) {
              return (
                <option key={type} value={type}>{type} (₹{price})</option>
              );
            })}
          </select>
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={function (event) {
              setQuantity(Math.min(10, Math.max(1, Number(event.target.value) || 1)));
            }}
          />
        </label>

        <div className="booking-summary-preview" aria-live="polite">
          <h4>Booking Summary</h4>
          <p><strong>Match:</strong> {match.teams}</p>
          <p><strong>Ticket:</strong> {ticketType} (₹{match.prices[ticketType]} each)</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p className="modal-total"><strong>Total:</strong> ₹{total}</p>
        </div>
        {message && <p className="modal-error" role="alert">{message}</p>}

        <div className="modal-actions">
          <button type="button" className="btn modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? "Saving..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingModal;
