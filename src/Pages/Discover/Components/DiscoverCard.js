import { Link } from 'react-router-dom';
import "./DiscoverCard.css";
import yellowlogo from "./yellowlogo.png";
import bluelogo from "./bluelogo.png";
import redlogo from "./redlogo.png";
import teallogo from "./teallogo.png";

function DiscoverCard({
    color, // yellow, blue, red, teal
    href,
    // name,
    firstname,
    lastname,
    role,
    state,
    profilepic,
}) {

    // const color = ["yellow", "blue", "red", "teal"][parseInt(Math.random() * 4)];
    let logo;
    let border;
    const getborder = color => `4px solid ${color}`;
    switch (color) {
        case "yellow":
            logo = yellowlogo;
            border = getborder("#FFD048");
            break;
        case "blue":
            logo = bluelogo;
            border = getborder("#9EC7E1");
            break;
        case "red":
            logo = redlogo;
            border = getborder("#CB4E28");
            break;
        case "teal":
            logo = teallogo;
            border = getborder("#00597C");
            break;
        default:
            logo = teallogo;
            border = getborder("#00597C");

    }

    let logoPlace = null
    let logoPic = null
    if(profilepic === null){
        logoPlace = <img src={logo} alt={firstname+' '+lastname + Math.random()}/>
    }
    else{
        logoPic = <img src={profilepic} alt=''/>
    }

    return (
        <div className="discoverCard" style={{"border": border}}>
        <Link to={href}>
                <div className="discoverCard_holePunch" style={{"border": border}}></div>
                <div className="discoverCard_items">
                    <div className="discoverCard_logo">
                        <div className="discoverCard_logoPic">
                        {logoPic}
                        </div>
                        <div className="discoverCard_logoPlace">
                        {logoPlace}
                        </div>
                    </div>
                    <div className="discoverCard_data">
                        <p className="discoverCard_name" style={{"borderTop": border, "borderLeft": "none", "borderRight": border, "borderBottom": border}}>{lastname}, {firstname} </p>
                        <p className="discoverCard_role" style={{"borderTop": "none", "borderLeft": "none", "borderRight": border, "borderBottom": border}}>{role}</p>
                        <p className="discoverCard_state" style={{"borderTop": "none", "borderLeft": "none", "borderRight": border, "borderBottom": border}}>{state}</p>
                    </div>
                </div>
                <p className="discoverCard_bottom">National Women&apos;s Conference 1977</p>
        </Link>
        </div>
    )
}

export default DiscoverCard
