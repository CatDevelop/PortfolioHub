import React, {useEffect, useState} from 'react';
import s from './FillProfileForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";
import {getProfile} from "../../store/slices/profileSlice";
import {useProfile} from "../../hooks/use-profile";
import {useParams} from "react-router-dom";
import TagInput from "../TagInput/TagInput";
import ResumeEdit from "../ResumeEdit/ResumeEdit";

function FillProfileForm({register, errors, selectedTags, setSelectedTags, getValues, watchResumeFile, setValue}) {
    return (
        <>
            {/*<p className={s.header}>Добро пожаловать в Portfolio Hub</p>*/}
            <Form className={s.fillProfileForm}>
                <div className={s.block}>
                    <h1 className={s.blockTitle}>Личная информация</h1>
                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='fillProfileName'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                   }
                               }
                               errors={errors}
                               title="Имя"
                               require={true}
                               // isBig={true}
                               type="text"/>
                        <Input register={register}
                               registerName='fillProfileSurname'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                   }
                               }
                               errors={errors}
                               title="Фамилия"
                               require={true}
                               // isBig={true}
                               type="text"/>
                    </div>

                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='fillProfileEmail'
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
                               type="text"
                               // isBig={true}
                               disabled={true}
                        />
                        <Input register={register}
                               registerName='fillProfilePhone'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                       pattern: {
                                           value: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                                           message: "Введите номер телефона"
                                       }
                                   }
                               }
                               errors={errors}
                               title="Телефон"
                               require={true}
                               // isBig={true}
                               type="text"
                        />
                    </div>

                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='fillProfileShortDescription'
                               errors={errors}
                               title="О себе"
                               // require={true}
                               type="text"
                               rows={2}
                               as="textarea"
                        />

                        <TagInput
                            title='Теги'
                            selectedOptions={selectedTags}
                            setSelectedOptions={setSelectedTags}
                        />
                    </div>
                </div>

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Резюме</h1>
                    <ResumeEdit register={register}
                                registerName='fillProfileResume'
                                errors={errors}
                                file={getValues('fillProfileResume')}
                                watchResumeFile={watchResumeFile}
                                setValue={setValue}
                    />
                </div>

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Логотип портфолио</h1>
                </div>

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Социальные сети</h1>
                </div>

                {/*<ImageEdit type="submit">Войти в систему</ImageEdit>*/}
            </Form>


            {/*<ImageEdit onClick={handleSubmit(onSubmit)}>sejkfnsrg</ImageEdit>*/}
        </>
    )
}

export default FillProfileForm;
