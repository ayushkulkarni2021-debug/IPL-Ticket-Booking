import { useState } from "react";
import "./Navbar.css";

// Navbar component: renders the site header with logo and nav links.
// Uses React useState to manage the hamburger menu open/close state.
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(function (prev) {
      return !prev;
    });
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>IPL 2026</h2>
      </div>

      {/* Hamburger button — visible only on mobile via CSS */}
      <button
        type="button"
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        &#9776;
      </button>

      {/* Nav links — toggled via "open" class on mobile */}
      <div className={`nav-links${isOpen ? " open" : ""}`}>
        <a href="#matches" onClick={closeMenu}>Matches</a>
        <a href="#booking" onClick={closeMenu}>Book Ticket</a>
        <a href="#guidelines" onClick={closeMenu}>Guidelines</a>
      </div>
    </nav>
  );
}

export default Navbar;
