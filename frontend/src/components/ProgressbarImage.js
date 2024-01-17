import './Landing.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";

export function ProgressbarImage({state}) {

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
    else if(state === 3){
        step3 = "progress_elem current_elem"
    }

    return (
        <>
            <ul class = "progress_list">

                    <li class = {step1}>
                        <span class = "progress_count">1</span>
                        <span class = "progress_label">날짜 선택</span>
                    </li>
                

                    <li class = {step2}>
                        <span class = "progress_count">2</span>
                        <span class = "progress_label">이미지 업로드</span>
                    </li>


                    <li class = {step3}>
                        <span class = "progress_count">3</span>
                        <span class = "progress_label">장소 선택</span>
                    </li>
            </ul>
        </>
    );
}