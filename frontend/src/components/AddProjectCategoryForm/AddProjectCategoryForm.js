import React, {useState} from 'react';
import s from './AddProjectCategoryForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";
import {addProjectCategory} from "../../store/slices/projectsSlice";

function AddProjectCategoryForm(props) {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            addProjectCategoryName: '',
        },
        mode: "onBlur"
    });

    // const [isAdd, setIsAdd] = useState(false);

    const onSubmit = (payload) => {
        const data = {
            userID: props.userID,
            categoryName: payload.addProjectCategoryName
        }
        dispatch(addProjectCategory(data)).then(()=>props.setIsAdd(false));
        reset();
    }

    return (
        <>
            {
                props.isAdd ?
                    <div className={s.addProjectCategoryFormContainer} ref={props.scrollToRef}>
                        <Form className={s.addProjectCategoryForm} onSubmit={handleSubmit(onSubmit)}>
                            <Input register={register}
                                   registerName='addProjectCategoryName'
                                   options={
                                       {
                                           required: true
                                       }
                                   }
                                   errors={errors}
                                   title="Название раздела"
                                   require={true}
                                   type="text"/>
                            <div className={s.buttons}>
                                <Button type="submit">Добавить раздел</Button>
                                <Button click={()=>props.setIsAdd(!props.isAdd)}>Отменить</Button>
                            </div>
                        </Form>
                    </div>

                    :

                    <div className={s.addProjectCategory} onClick={() => props.setIsAdd(!props.isAdd)} ref={props.scrollToRef}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M15 4.5C15.8284 4.5 16.5 5.17157 16.5 6V13.5H24C24.8284 13.5 25.5 14.1716 25.5 15C25.5 15.8284 24.8284 16.5 24 16.5H16.5V24C16.5 24.8284 15.8284 25.5 15 25.5C14.1716 25.5 13.5 24.8284 13.5 24V16.5H6C5.17157 16.5 4.5 15.8284 4.5 15C4.5 14.1716 5.17157 13.5 6 13.5L13.5 13.5V6C13.5 5.17157 14.1716 4.5 15 4.5Z"
                                  fill="#898989"/>
                        </svg>
                        Новая категория проектов
                    </div>
            }
            {/*<p className={s.header}>Добро пожаловать в Portfolio Hub</p>*/}
            {/*<Form className={s.authorizationForm} onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <p className={s.authorization}>Авторизация</p>*/}
            {/*        <Input register={register}*/}
            {/*               registerName='authorizationEmail'*/}
            {/*               options={*/}
            {/*                   {*/}
            {/*                       required: true*/}
            {/*                   }*/}
            {/*               }*/}
            {/*               errors={errors}*/}
            {/*               title="Логин или почта"*/}
            {/*               require={true}*/}
            {/*               type="text"/>*/}
            {/*        <Input register={register}*/}
            {/*               registerName='authorizationPassword'*/}
            {/*               options={*/}
            {/*                   {*/}
            {/*                       required: true*/}
            {/*                   }*/}
            {/*               }*/}
            {/*               errors={errors}*/}
            {/*               title="Пароль"*/}
            {/*               require={true}*/}
            {/*               type="password"/>*/}
            {/*        <Button type="submit">Войти в систему</Button>*/}
            {/*</Form>*/}
        </>
    )
}

export default AddProjectCategoryForm;
