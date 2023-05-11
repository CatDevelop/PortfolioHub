import React from 'react';
import s from './ConsoleAndPhoto.module.css';
import snap from "../../assets/img/Snap3.svg";

function Console(props) {
    return (<>
            <img src={snap} alt="I'm console" className="Console"/>

            <h2 className={s.ConsoleText}> {"<Hi, I'm Max>"} <br/>
                <span>
                    <span className="wrap">
                        {props.text}
                    </span>
                </span>
            </h2>
        </>)
}

export default Console;