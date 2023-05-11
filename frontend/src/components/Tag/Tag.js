
import React from 'react';
import s from './Tag.module.css';
import Form from "react-bootstrap/Form";

import classNames from "classnames/bind";

function Tag(props) {
    return (
        <div className={classNames(s.tag, s[props.type])}>
            <p className={s.text}>{props.text}</p>
        </div>
    )
}

export default Tag;