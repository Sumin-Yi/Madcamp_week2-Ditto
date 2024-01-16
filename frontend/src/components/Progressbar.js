import React, { useState, useEffect} from 'react';
import Logo from '../lib/styles/Logo.svg'
import './Landing.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

export function Progressbar({state}) {

    var step1 = "progress_elem"
    var step2 = "progress_elem"
    var step3 = "progress_elem"
    
    console.log(state)
    if(state === 1){
        step1 = "progress_elem current_elem"
    }
    else if(state === 2){
        step2 = "progress_elem current_elem"
    }
    else{
        step3 = "progress_elem current_elem"
    }

    return (
        <>
            <ul class = "progress_list">

                    <li class = {step1}>
                        <span class = "progress_count">1</span>
                        <span class = "progress_label">도시 선택</span>
                    </li>
                

                    <li class = {step2}>
                        <span class = "progress_count">2</span>
                        <span class = "progress_label">카테고리 선택</span>
                    </li>


                    <li class = {step3}>
                        <span class = "progress_count">3</span>
                        <span class = "progress_label">장소 선택</span>
                    </li>
            </ul>
        </>

        // <>
        // <div className = {progressbar}>
        //     <div className = {progressClass}>
        //     </div>
        //     <div className = "description">
        //         <div className = "textbox">
        //             <h1 className = "medium-primary-heading">Step 1</h1>
        //             <h1 className = "small-primary-heading">어느 지역인가요?</h1>
        //         </div>
        //         <div className = "textbox">
        //             <h1 className = "medium-primary-heading">Step 2</h1>
        //             <h1 className = "small-primary-heading">어느 스팟인가요?</h1>
        //         </div>
        //         <div className = "textbox">
        //             <h1 className = "medium-primary-heading">Step 3</h1>
        //             <h1 className = "small-primary-heading">장소를 담아주세요.</h1>
        //         </div>
        //     </div>
        // </div>
        // </>
    );
}