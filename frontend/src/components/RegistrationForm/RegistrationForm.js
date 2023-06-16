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
                           errors={errors}
                           title="Почта"
                           require={true}
                           type="email"/>

                    <Input register={register}
                           registerName='registrationLogin'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           errors={errors}
                           title="Логин"
                           require={true}/>

                    <Input register={register}
                           registerName='registrationPassword'
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
                           errors={errors}
                           title="Пароль"
                           require={true}
                           type="password"/>

                    <Input register={register}
                           registerName='registrationRetryPassword'
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
