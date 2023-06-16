import React from 'react';
import s from './ChangeVisibleForm.module.css';
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {changeVisibility} from "../../store/slices/profileSlice";
import {useNavigate} from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

function ChangeVisibleForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (payload) => {
        console.log(props.selectVisibleStatus)
        dispatch(changeVisibility({visible: props.selectVisibleStatus.value, userID: props.userID})).then(() => {
            props.setActive(false)
        })
    }

    const status = [
        {value: "Public", label: "Публичное"},
        {value: "Link", label: "По ссылке"},
        {value: "Private", label: "Приватное"},
    ]

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                <p className={s.authorization}>Изменение видимости портфолио</p>

                <Dropdown options={status} minWidth="200px" onChange={props.setSelectVisibleStatus}
                          value={props.selectVisibleStatus}/>

                <p className={s.description}>
                    {
                        props.selectVisibleStatus.value === "Public" ?
                            "Ваше портфолио будет доступно всем пользователям,\n оно будет отображаться в каталоге пользователей" :
                            props.selectVisibleStatus.value === "Private" ?
                                "Ваше портфолио не доступно другим пользователям,\n его видите только вы" :
                                "Просматривать могут все в интернете,\n у кого есть эта ссылка"
                    }
                </p>

                <Button type="submit">Изменить видимость</Button>
            </Form>
        </>
    )
}

export default ChangeVisibleForm;
