import React from 'react';
import s from './Button.module.css';

function Button(props) {
    return (
        <>
            <button onClick={props.click} type="button" className={s.button} {...props}>{props.children}</button>
        </>
    )
}

export default Button;