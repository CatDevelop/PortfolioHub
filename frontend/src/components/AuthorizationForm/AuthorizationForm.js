import React from 'react';
import s from './AuthorizationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";

function AuthorizationForm(props) {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            authorizationEmail: '',
            authorizationPassword: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        payload.authorizationPassword = md5(payload.authorizationPassword);
        const data = {
            email: payload.authorizationEmail,
            password: payload.authorizationPassword
        }
        dispatch(signInUser(data));
    }

    return (
        <>
            <p className={s.header}>Добро пожаловать в Portfolio Hub</p>
            <Form className={s.authorizationForm} onSubmit={handleSubmit(onSubmit)}>
                <p className={s.authorization}>Авторизация</p>
                    <Input register={register}
                           registerName='authorizationEmail'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Логин или почта"
                           require={true}
                           type="text"/>
                    <Input register={register}
                           registerName='authorizationPassword'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Пароль"
                           require={true}
                           type="password"/>
                    <Button type="submit">Войти в систему</Button>
            </Form>
        </>
    )
}

export default AuthorizationForm;
