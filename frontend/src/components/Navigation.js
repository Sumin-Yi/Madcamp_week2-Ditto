import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../lib/styles/DITTO.svg'
import './Landing.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

export const LoginNavigation = () => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/')
    };

    useEffect(() => {
        fetch("http://172.10.8.246/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            setIsLoggedIn(data.data ? true : false);
        })
        .catch((error) => {
        });
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigateToHome();
    };

    return (
        <nav>
            <div className='nav-logo-container'>
                <a href="http://localhost:3000">
                    <img src={Logo} alt="" />
                </a>
            </div>
            <div className="navbar-links-container">
                {isLoggedIn ? (
                    <>
                        <a href="#" onClick={handleLogout}>Log Out</a>
                        <a href="http://localhost:3000/mypage">My List</a>
                    </>
                ) : (
                    <>
                        <a href="http://localhost:3000/sign-in">Log In</a>
                        <a href="http://localhost:3000/sign-up">Sign Up</a>
                    </>
                )}
            </div>
        </nav>
    );
};
