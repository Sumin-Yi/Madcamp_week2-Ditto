import React, { useState, useEffect} from 'react';
import Logo from '../lib/styles/Logo.svg'
import './Landing.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

export const LogoutNavigation  = () => {

    return (
        <nav>
            <div classname = 'nav-logo-container'>
                <a href = "http://localhost:3000">
                <img src = {Logo} alt = ""/>
                </a>
            </div>
            <div className = "navbar-links-container">
                <a href = "http://localhost:3000">Log In</a>
                <a href = "http://localhost:3000">Sign Up</a>
                <a href = "http://localhost:3000"></a>
            </div>
        </nav>
    );

}

export const LoginNavigation  = () => {

    return (
        <nav>
            <div classname = 'nav-logo-container'>
                <a href = "http://localhost:3000">
                <img src = {Logo} alt = ""/>
                </a>
            </div>
            <div className = "navbar-links-container">
                <a href = "http://localhost:3000">Log Out</a>
                <a href = "http://localhost:3000">My List</a>
                <a href = "http://localhost:3000"></a>
            </div>
        </nav>
    );

}