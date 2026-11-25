import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchList from "./components/MatchList";
import "./App.css";

// App is the root component.
// It composes Navbar, Hero, and MatchList — each is a separate reusable component.
function App() {
  const [bookingSummary, setBookingSummary] = useState(null);

  return (
    <>
      {/* Navbar: logo + responsive hamburger navigation */}
      <Navbar />

      {/* Hero: banner section — title and subtitle passed as props */}
      <Hero
        title="Experience The Stadium Energy Live!"
        subtitle="Book your IPL tickets and enjoy the excitement."
      />

      {/* MatchList: renders all MatchCard components with filter and view toggle */}
      <MatchList onBookingConfirmed={setBookingSummary} />

      <section id="booking" className="booking-placeholder">
        <h2>Book Your Tickets</h2>
        <p>Select a match above and click <strong>Book</strong> to enter your details.</p>
        <p>Demo bookings are saved only in this browser and do not reserve real seats.</p>
        {bookingSummary && (
          <div className="booking-summary" aria-live="polite">
            <h3>Booking Summary</h3>
            <p><strong>Reference:</strong> {bookingSummary.id}</p>
            <p><strong>Match:</strong> {bookingSummary.match}</p>
            <p><strong>Date &amp; Time:</strong> {bookingSummary.date}</p>
            <p><strong>Venue:</strong> {bookingSummary.venue}</p>
            <p><strong>Ticket:</strong> {bookingSummary.ticketType}</p>
            <p><strong>Quantity:</strong> {bookingSummary.quantity}</p>
            <p><strong>Total:</strong> ₹{bookingSummary.total}</p>
          </div>
        )}
      </section>

      {/* Guidelines section */}
      <section id="guidelines" className="guidelines-section">
        <h2>Stadium Guidelines</h2>
        <div className="guideline-container">
          <div className="card">
            <h3>Ticket Verification</h3>
            <p>Carry your valid ticket at the stadium entrance.</p>
          </div>
          <div className="card">
            <h3>ID Proof Requirement</h3>
            <p>Carry a valid identity proof for verification.</p>
          </div>
          <div className="card">
            <h3>Prohibited Items</h3>
            <p>Sharp objects and outside food are not allowed.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright &copy; 2026 IPL Ticket Booking</p>
      </footer>
    </>
  );
}

export default App;
