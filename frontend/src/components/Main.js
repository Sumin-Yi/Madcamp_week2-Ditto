import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginNavigation } from "./Navigation";
import "../lib/styles/Button.css";
import "./Main.css";
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

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
                    <div className="keywordsearch" onClick={keywordhandleButtonClick}>
                        <h1 className="medium-primary-heading">키워드 검색</h1>
                        <SvgIcon className = "icon" component={SearchIcon} inheritViewBox style={{ width: '150px', height: '150px', marginTop: '10px'}}/>
                        <h2 className = "primary-text"> 키워드를 이용해 원하는 데이트 스팟을 추천해줍니다.</h2>
                    </div>
                    <div className="imagesearch" onClick={imagehandleButtonClick}>
                        <h1 className="medium-primary-heading">이미지 검색</h1>
                        <SvgIcon className = "icon" component={ImageSearchIcon} inheritViewBox style={{ width: '150px', height: '150px', marginTop: '10px'}} />
                        <h2 className = "primary-text"> 비슷한 느낌을 갖는 데이트 스팟을 추천해줍니다.</h2>
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
