import React from 'react';
import s from './Tags.module.css';
import Form from "react-bootstrap/Form";

import classNames from "classnames/bind";
import Tag from "../Tag/Tag";

function Tags(props) {
    return (
        <div className={s.tags}>
            {props.tags.map(tag => <Tag key={tag.id} type={tag.type} text={tag.label}/>)}
        </div>
    )
}

export default Tags;
