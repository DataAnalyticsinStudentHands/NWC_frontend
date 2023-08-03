import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  function JuicyLink({ navname, pathname }) {
    return (
      <Link
        className={`navigation_link ${
          location.pathname === pathname ? 'navigation_link--selected' : ''
        }`}
        to={pathname}
      >
        {navname}
      </Link>
    );
  }

  return (
    <div className="navigation_total">
      <nav className="navigation">
        <div></div>
        <JuicyLink navname="Home" pathname="/" />
        <JuicyLink navname="About Project" pathname="/about" />
        <JuicyLink navname="Why The NWC Matters" pathname="/why" />
        <JuicyLink navname="Discover NWC Stories" pathname="/discover"/>
        <JuicyLink navname="Researching the NWC" pathname="/researchingNWC" />
        <JuicyLink navname="How to Contribute" pathname="/howtocontribute" />
        <div></div>
        {/*
        <img className="navigation_search" src={icon_search}/>*/}
      </nav>
      <div className="navigation_border"></div>
    </div>
  );
}

export default Navigation;
