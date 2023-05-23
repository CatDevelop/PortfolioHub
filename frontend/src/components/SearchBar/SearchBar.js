import React from 'react';
import s from './Search.module.css';
import Form from "react-bootstrap/Form";
import classNames from "classnames/bind";
import InputMask from "react-input-mask";

function SearchBar(props) {
    return (
        <div className={s.input}>
            <div className={s.titleBox}><p className={s.title}>{props.title??""}</p>
                {props.require ? <p title="Поле обязательно для ввода" className={s.required}>*</p> : <></>}</div>
            {/*<Form.Control {...props.register(props.registerName, props.options)} className={s.inputBox} {...props}/>*/}
            <Form.Control {...props.register(props.registerName, props.options)} className={classNames(props.isBig? s.bigInputBox : s.inputBox, props.errors?.[props.registerName]?s.invalid:"")} {...props}/>
            <div>

            </div>
        </div>
    )
}

export default SearchBar;
