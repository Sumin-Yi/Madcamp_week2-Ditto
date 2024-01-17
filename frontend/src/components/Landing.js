import React from "react";
import { LoginNavigation} from "./Navigation";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
const Landing = () => {

    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate('/main')
    };

    return (
        <div className = "home-container">
            <LoginNavigation/>
            <div classname = "home-banner-container">
                <div className = "home-text-section">
                    <h1 className = "primary-heading">
                        오늘은 어디로 갈까?
                    </h1>
                    <p className = "hometext">
                        내 취향에 맞는 데이트 장소를 따라가보아요!
                    </p>
                    <p className = "homedescription">
                    "디토 소비"
                    </p>
                    <p className = "homedescription">
                    - 특정 대상의 선택이나 제안을 따르는 일종의 추종소비. 그러나 단순히 누군가를 맹목적으로 추종하는 것을 넘어, 개인의 가치관에 맞는 대상을 찾고 이를 주체적으로 해석하여 의사결정에 활용하는 것을 의미.
                    </p>
                    <button className = "secondary-button" onClick = {navigateToMain}>
                        데이트 코스 추천받기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing;