import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginNavigation } from "./Navigation";
import "../lib/styles/Button.css";
import "./Main.css";
import Calendar from "./Calendar";

export default function Main() {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

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
            console.log(data, "userData");
            setUserData(data.data);
        });
    }, []);

    const keywordhandleButtonClick = () => {
        navigate('/keywordsearch');
    };

    const imagehandleButtonClick = () => {
        navigate('/uploadimagesearch');
    };

    return (
        <>
            <LoginNavigation/>
            <div className="contents">
                <div className="recommend">
                    <h1 className="medium-primary-heading">
                        데이트 장소 추천받기
                    </h1>
                </div>
                <div className="search">
                    <div className="keywordsearch">
                        <h1 className="medium-primary-heading">키워드로 검색해보세요.</h1>
                        <button className="secondary-button" onClick={keywordhandleButtonClick}>
                            키워드 검색하기
                        </button>
                    </div>
                    <div className="imagesearch">
                        <h1 className="medium-primary-heading">이미지로 검색해보세요.</h1>
                        <button className="secondary-button" onClick={imagehandleButtonClick}>
                            이미지 검색하기
                        </button>
                    </div>
                </div>
                <div className="recommend">
                    <h1 className="medium-primary-heading">
                        나의 데이트 코스 
                    </h1>
                </div>
            </div>
        </>
    );
}
