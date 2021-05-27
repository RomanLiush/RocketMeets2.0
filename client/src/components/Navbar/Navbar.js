import React from 'react';
import './navbar.css';
import logo from '../../assets/image/RocketMeets.svg';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={'navbar'}>
            <img src={logo} alt="RocketMeets" className="navbar__logo"/>
            <div className={'navbar__item'}>
                {/*<NavLink to={'/login'}><div className="navbar__login">SignIn in</div></NavLink>*/}
                {/*<NavLink to={'/signup'}><div className="navbar__registration">SignIn up</div></NavLink>*/}
            </div>
        </div>
    );
};

export default Navbar;
