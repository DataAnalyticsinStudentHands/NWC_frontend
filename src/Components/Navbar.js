import React from 'react';
// import PropTypes from 'prop-types';
import ColorObj from "../assets/color.config.json";
import { Typography } from './Typography';
export const Navbar = () =>{
    return(
        <>
        <div className="navbar-container" style={{
            backgroundColor: ColorObj.primary.dark.blue,
        }}>
            <nav className="navbar">
                <a href="/">
                    <Typography type="caption" color="primary.light.blue">
                        Home
                    </Typography>
                </a>
                <a className="navbar_link" href="/about">About Project</a>
                <a className="navbar_link" href="/why">Why The NWC Matters</a>
                <a className="navbar_link" href="/discover">Discover NWC Stories</a>
                <a className="navbar_link" href="/researchingNWC">Researching the NWC</a>
                <a className="navbar_link" href="/howtocontribute">How to Contribute</a>
                
            </nav>

        </div>
                   <div className='navbar-container-border'></div> 
        </>

    )
}