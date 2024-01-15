import React, { useState, useEffect} from 'react';
import Logo from '../lib/styles/Logo.svg'
import './Landing.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

export function Progressbar({state}) {

    var progressClass =  ""
    var progressbar = ""
    
    console.log(state)
    if(state === 1){
        progressClass = "state1_progress"
        progressbar = "progress_bar1"
    }
    else if(state === 2){
        progressClass = "state2_progress"
        progressbar = "progress_bar2"
    }
    else{
        progressClass = "state3_progress"
        progressbar = "progress_bar3"
    }

    return (
        <>
        <div className = {progressbar}>
            <div className = {progressClass}>
            </div>
            <div className = "description">
                <div className = "textbox">
                    <h1 className = "medium-primary-heading">Step 1</h1>
                    <h1 className = "small-primary-heading">어느 지역인가요?</h1>
                </div>
                <div className = "textbox">
                    <h1 className = "medium-primary-heading">Step 2</h1>
                    <h1 className = "small-primary-heading">어느 스팟인가요?</h1>
                </div>
                <div className = "textbox">
                    <h1 className = "medium-primary-heading">Step 3</h1>
                    <h1 className = "small-primary-heading">장소를 담아주세요.</h1>
                </div>
            </div>
        </div>
        </>
    );
}