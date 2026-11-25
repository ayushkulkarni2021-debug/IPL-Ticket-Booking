import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchList from "./components/MatchList";
import "./App.css";

// App is the root component.
// It composes Navbar, Hero, and MatchList — each is a separate reusable component.
function App() {
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
      <MatchList />

      {/* Booking placeholder section */}
      <section id="booking" className="booking-placeholder">
        <h2>Book Your Tickets</h2>
        <p>Select a match above and click <strong>Book</strong> to get started.</p>
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
