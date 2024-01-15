import React from "react";
import { LoginNavigation, LogoutNavigation } from "./Navigation";
import { FiArrowRight } from "react-icons/fi";
import "./Landing.css";
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

const Landing = () => {
    return (
        <div className = "home-container">
            <LoginNavigation/>
            <div classname = "home-banner-container">
                <div className = "home-text-section">
                    <h1 className = "primary-heading">
                        오늘은 어디로 갈까?
                    </h1>
                    <p className = "primary-text">
                        당신에게 딱 맞는 데이트 코스를 지금 찾아보세요.
                    </p>
                    <button className = "secondary-button">
                        데이트 코스 추천받기 <FiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing;