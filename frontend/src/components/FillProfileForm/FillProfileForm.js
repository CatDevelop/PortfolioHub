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
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getProfile(userId));
        debugger
    }, []);
    const profile = useProfile();


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
                                       required: true
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
                                       required: true
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
                                       required: true
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
                                       required: true
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
