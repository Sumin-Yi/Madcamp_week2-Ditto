import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn', 'btn_outline'];
const SIZES = ['btn_small', 'btn_mideum', 'bin_large'];


// Button with name : children

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {

    // default: .btn
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    
    // default: .btn_mideum
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link to = '/sign-up' className = 'btn-mobile'>
            <button
            className = {`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick = {onClick}
            type = {type}
            >
                {children}
            </button>
        </Link>

    )
}