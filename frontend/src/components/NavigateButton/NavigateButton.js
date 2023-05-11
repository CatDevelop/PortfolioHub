import React from 'react';
import s from './NavigateButton.module.css';
import {useNavigate} from "react-router-dom";

function NavigateButton(props) {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={props.link ? () => navigate(props.link) : props.click} type="button" className={s.button} {...props}>{props.children}</button>
        </>
    )
}

export default NavigateButton;
