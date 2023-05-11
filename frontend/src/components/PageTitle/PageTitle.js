
import React from 'react';
import s from './PageTitle.module.css';
import Form from "react-bootstrap/Form";
import classNames from "classnames/bind";

function PageTitle(props) {
    return (
        <div className={s.pageTitle}>
            {props.title}
        </div>
    )
}

export default PageTitle;
