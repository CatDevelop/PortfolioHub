import React from 'react';
import s from './DeletePortfolioForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {deleteProfile} from "../../store/slices/profileSlice";
import {useNavigate} from "react-router-dom";

function DeletePortfolioForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (payload) => {
        dispatch(deleteProfile({userID: props.userID})).then(() => {
            navigate("/")
        })
    }

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                <p className={s.authorization}>Удаление аккаунта</p>
                <p className={s.danger}>Это действие необратимо - восстановление аккаунта невозможно<br/>
                    Для подтверждения напишите "<a className={s.dangerText}>{props.portfolioName}</a>" в поле
                </p>

                <Input register={props.register}
                       registerName='deletePortfolioName'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                           }
                       }
                       errors={props.errors}
                    // title="Повторите новый пароль"
                    // require={true}
                       type="text"/>
                <Button type="submit" isSecond
                        disabled={props.getValues("deletePortfolioName") !== props.portfolioName}>Удалить
                    аккаунт</Button>
            </Form>
        </>
    )
}

export default DeletePortfolioForm;
