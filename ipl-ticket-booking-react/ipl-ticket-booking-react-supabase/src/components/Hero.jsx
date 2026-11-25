import "./Hero.css";

// Hero component: banner section at the top of the page.
// Accepts title and subtitle as props so it is reusable.
function Hero({ title, subtitle }) {
  return (
    <div className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="hero-actions">
        <a href="#matches" className="btn">View Schedule</a>
        <a href="#booking" className="btn">Book Ticket</a>
      </div>
    </div>
  );
}

export default Hero;
