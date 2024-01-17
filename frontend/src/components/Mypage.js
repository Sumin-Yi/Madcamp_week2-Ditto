import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { LoginNavigation } from "./Navigation";
import "../lib/styles/Button.css";
import "./Mypage.css";
import "./Main.css";
import Calendar from './Calendar';
import Datemap from './Datemap';
import Mark from './Mark';

export default function Mypage() {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState('20240116');
    const [selectedMyList, setSelectedMyList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    }

    const submitButtonClick = () => {
        navigate('/main')
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
            setUserData(data.data);
            setSelectedMyList(data.data.myList);
        });
    }, []);

    console.log(selectedMyList);
    var places = []; 
    if (selectedMyList[Number(selectedDate)]) {
    places = selectedMyList[Number(selectedDate)].map(item => ({
        place_name: item.title,
        address_name: item.address
    }))
    };
    console.log("places", places);

    return (
        <>
            <LoginNavigation/>
            <div className="contents_set">
                <div className="recommend">
                    <h1 className="medium-primary-heading">
                        데이트 코스 추천받기
                    </h1>
                </div>
                <h1 className = "date_text">
                    원하는 날짜를 선택해주세요.
                </h1>

                <div className = "calendar">
                <Calendar onDate = {handleDateSelect} mode = {3}/>
                </div>
                
                <div className = "search_result">
            
                    <div className = "show_tab">
                        <h1 className = "course_text">
                            추천 데이트 코스
                        </h1>

                        <div className="city-list-container" style={{ height: '400px', overflowY: 'scroll' }}>
                            {places && places.length > 0 ? (
                                places.map((elem, index) => (
                                <div
                                    className="searchlist"
                                    key={index}
                                    style={{
                                    display: 'flex',
                                    height: '15%',
                                    width: 'calc(100% - 30px)',
                                    borderRadius: '10px',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                                    marginBottom: '20px',
                                    margin: '10px',
                                    // backgroundColor: `${selectedItemIndex.includes(index) ? 'var(--main1)' : 'var(--white)'}`
                                    }}
                                >
                                    <h1 className="small-primary-heading" style={{ margin: '10px', flex: '1' }}>{elem.place_name}</h1>
                                </div>
                                ))
                            ) : (
                                <div className="nolist">
                                <h1 className="no_text">장소가 없습니다.</h1>
                                <button className="secondary-button" onClick={submitButtonClick}>장소 선택하러 가기</button>
                                </div>
                            )}
                        </div>
                    </div>


                        <div className = "searchmap">
                        
                        <h1 className = "course_text">
                            데이트 코스 지도
                        </h1>

                        <Mark className="shownmap" search={places && places.length > 0 ? (places) : ([])} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }} />

                        </div>
                </div>
                
            </div>
        </>
    );
}
