import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import hamburger from './res/hamburger.png'
import dove from '../Footer/res/icon.png'

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function JuicyLink({ navname, pathname }) {
    const isActive = location.pathname === pathname; // Determine if the link is active
    return (
        <Link
            className={`navigation_link ${isActive ? "navigation_link--active" : "navigation_link--inactive"}`}
            to={pathname}
            onClick={() => setIsMenuOpen(false)}
        >
            {navname}
        </Link>
    );
}

  function NavItems() {
    return (
      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <div></div>
        <JuicyLink navname="Home" pathname="/" />
        <JuicyLink navname="About Project" pathname="/about" />
        <JuicyLink navname="Why The NWC Matters" pathname="/why" />
        <JuicyLink navname="Discover NWC Stories" pathname="/discover" />
        <JuicyLink navname="Researching the NWC" pathname="/researchingNWC" />
        <JuicyLink navname="How to Contribute" pathname="/howtocontribute" />
        <div></div>
      </nav>
    );
  }

  return (
    <div className="navigation_total">
      <img src={dove} alt="Dove" className="dove_icon" />
      {/* Hamburger button, visible only on smaller screens */}
      <button
        className="hamburger_icon"
        onClick={toggleMenu}
      >
        <img src={hamburger} alt="Menu" />
      </button>
      {/* Conditionally render navigation items */}
      {(isMenuOpen || window.innerWidth > 768) && <NavItems />}
      <div className="navigation_border"></div>
    </div>
  );
}

export default Navigation;
