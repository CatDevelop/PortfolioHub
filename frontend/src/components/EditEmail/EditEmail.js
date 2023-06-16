import React from 'react';
import s from './EditEmail.module.css';
import Form from "react-bootstrap/Form";
import classNames from "classnames/bind";
import InputMask from "react-input-mask";
import Input from "../Input/Input";

function EditEmail(props) {
    return (
        <div className={s.editEmail}>
            <Input register={props.register}
                   registerName='editProfileEmail'
                   options={
                       {
                           required: {
                               value: true,
                               message: "Поле обязательно для ввода"
                           },
                           pattern: {
                               value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                               message: "Введите почту"
                           }
                       }
                   }
                   errors={props.errors}
                   title="Почта"
                   require={true}
                   type="text"
                // isBig={true}
                   disabled={true}
            />
            <div className={s.eye} onClick={() => props.setIsVisibleEmail(!props.isVisibleEmail)}>

                {
                    props.isVisibleEmail ?
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9997 16.0001C19.9997 18.2092 18.2088 20.0001 15.9997 20.0001C13.7905 20.0001 11.9997 18.2092 11.9997 16.0001C11.9997 13.7909 13.7905 12.0001 15.9997 12.0001C18.2088 12.0001 19.9997 13.7909 19.9997 16.0001Z" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.27734 16C4.97638 10.5906 10.0301 6.66675 16.0003 6.66675C21.9705 6.66675 27.0242 10.5906 28.7232 16.0001C27.0242 21.4096 21.9705 25.3334 16.0003 25.3334C10.0301 25.3334 4.97635 21.4095 3.27734 16Z" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> :
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.99967 4L8.78522 8.78555M27.9997 28L23.2146 23.2149M18.4995 25.0995C17.69 25.253 16.8545 25.3333 16.0003 25.3333C10.0301 25.3333 4.97635 21.4095 3.27734 16C3.73987 14.5273 4.45102 13.1648 5.36159 11.9616M13.1712 13.1716C13.8951 12.4477 14.8951 12 15.9997 12C18.2088 12 19.9997 13.7909 19.9997 16C19.9997 17.1046 19.552 18.1046 18.8281 18.8284M13.1712 13.1716L18.8281 18.8284M13.1712 13.1716L8.78522 8.78555M18.8281 18.8284L8.78522 8.78555M18.8281 18.8284L23.2146 23.2149M8.78522 8.78555C10.865 7.44472 13.3418 6.66667 16.0003 6.66667C21.9705 6.66667 27.0242 10.5906 28.7232 16C27.7807 19.001 25.8057 21.5447 23.2146 23.2149" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                }


            </div>
        </div>
    )
}

export default EditEmail;
