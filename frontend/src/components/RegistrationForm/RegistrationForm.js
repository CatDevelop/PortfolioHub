import React from 'react';
import s from './RegistrationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import { signUpUser } from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';

const click = () => {console.log("click");};

function RegistrationForm(props) {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            registrationEmail: '',
            registrationLogin: '',
            registrationPassword: '',
            registrationRetryPassword: ''
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (payload.registrationPassword !== payload.registrationRetryPassword) {
            alert('Вы указали разные пароли!');
            return;
        }

        delete payload.registrationRetryPassword;
        payload.registrationPassword = md5(payload.registrationPassword);

        const data = {
            email: payload.registrationEmail,
            login: payload.registrationLogin,
            password: payload.registrationPassword
        }
        dispatch(signUpUser(data));
    }


    return (
        <>
            <p className={s.header}>Добро пожаловать в Portfolio Hub</p>
            <Form className={s.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <p className={s.registration}>Регистрация</p>
                    <Input register={register}
                           registerName='registrationEmail'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Почта"
                           require={true}
                           type="email"/>

                    <Input register={register}
                           registerName='registrationLogin'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Логин"
                           require={true}/>

                    <Input register={register}
                           registerName='registrationPassword'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Пароль"
                           require={true}
                           type="password"/>

                    <Input register={register}
                           registerName='registrationRetryPassword'
                           options={
                               {
                                   required: true
                               }
                           }
                           errors={errors}
                           title="Повторите пароль"
                           require={true}
                           type="password"/>

                    <Button type="submit">Зарегистрироваться</Button>
            </Form>
        </>
    )
}

export default RegistrationForm;
