import React from 'react';
import s from './Button.module.css';
import classNames from "classnames/bind";

function Button(props) {
    return (
        <>
            <button disabled={props.disabled} onClick={props.click} type="button" className={classNames(s.button, props.isSecond?s.second:"", props.isHide?s.hide:"")} {...props}>{props.children}</button>
        </>
    )
}

export default Button;
