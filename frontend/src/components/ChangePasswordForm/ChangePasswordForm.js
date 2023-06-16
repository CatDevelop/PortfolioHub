import React from 'react';
import s from './ChangePasswordForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {updatePassword} from "../../store/slices/profileSlice";

function ChangePasswordForm(props) {
    const dispatch = useDispatch();

    const onSubmit = (payload) => {
        payload.changePasswordOld = md5(payload.changePasswordOld);
        payload.changePasswordNew = md5(payload.changePasswordNew);
        payload.changePasswordNewRetry = md5(payload.changePasswordNewRetry);
        const data = {
            userID: props.userID,
            oldPassword: payload.changePasswordOld,
            newPassword: payload.changePasswordNew
        }

        if (payload.changePasswordOld !== payload.changePasswordNew && payload.changePasswordNew === payload.changePasswordNewRetry)
            dispatch(updatePassword(data));
    }

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                <p className={s.authorization}>Смена пароля</p>
                <Input register={props.register}
                       registerName='changePasswordOld'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                           }
                       }
                       errors={props.errors}
                       title="Старый пароль"
                       require={true}
                       type="text"/>
                <Input register={props.register}
                       registerName='changePasswordNew'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                               minLength: {
                                   value: 4,
                                   message: "Минимум 4 символа"
                               }
                           }
                       }
                       errors={props.errors}
                       title="Новый пароль"
                       require={true}
                       type="text"/>
                <Input register={props.register}
                       registerName='changePasswordNewRetry'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                               minLength: {
                                   value: 4,
                                   message: "Минимум 4 символа"
                               }
                           }
                       }
                       errors={props.errors}
                       title="Повторите новый пароль"
                       require={true}
                       type="text"/>
                <Button type="submit">Сменить пароль</Button>
            </Form>
        </>
    )
}

export default ChangePasswordForm;
