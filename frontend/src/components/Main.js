import { LoginNavigation } from "./Navigation"
import "../lib/styles/Button.css";
import "./Main.css";
import {useNavigate} from 'react-router-dom';
import Calendar from "./Calendar";

function Main() {
    
    const navigate = useNavigate();
    const keywordhandleButtonClick = () => {
        navigate('/keywordsearch')
    };
    const imagehandleButtonClick = () => {
        navigate('/uploadimagesearch')
    };
    
    return (
        <>
        <LoginNavigation/>
        <div className = "contents">
            <div className = "recommend">
                    <h1 className = "medium-primary-heading">
                    데이트 장소 추천받기
                    </h1>
            </div>
            <div className = "search">
                <div className = "keywordsearch">
                    <h1 className = "medium-primary-heading">키워드로 검색해보세요.</h1>
                    <button className = "secondary-button" onClick = {keywordhandleButtonClick}>
                        키워드 검색하기
                    </button>
                </div>
                <div className = "imagesearch">
                    <h1 className = "medium-primary-heading">이미지로 검색해보세요.</h1>
                    <button className = "secondary-button" onClick = {imagehandleButtonClick}>
                        이미지 검색하기
                    </button>
                </div>
            </div>
            <div className = "recommend">
                    <h1 className = "medium-primary-heading">
                    데이트 코스 짜기
                    </h1>
            </div>
            <div className = "list">
                <div className = "date">
                    <div className = "text">

                    </div>
                    <Calendar/>
                </div>
                <div className = "mylist"></div>
            </div>
        </div>
        </>
    )
}

export default Main