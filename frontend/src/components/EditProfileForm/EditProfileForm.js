import React, {useEffect, useState} from 'react';
import s from './EditProfileForm.module.css';
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
import ImageEdit from "../ImageEdit/ImageEdit";
import { v4 as uuidv4 } from 'uuid';

function EditProfileForm(
    {
        register,
        errors,
        reset,
        profile,
        selectedTags,
        setSelectedTags,
        getValues,
        watchResumeFile,
        watchAvatarImage,
        watchBannerImage,
        watchLogoImage,
        setValue
    }) {
    // const dispatch = useDispatch();
    // const { userId } = useParams();
    //
    // useEffect(() => {
    //     dispatch(getProfile(userId));
    //     debugger
    // }, []);
    // const profile = useProfile();

    useEffect(() => {
        reset({
            editProfileName: profile.name,
            editProfileSurname: profile.surname,
            editProfileEmail: profile.email,
            editProfilePhone: profile.phone,
            editProfileShortDescription: profile.shortDescription,
            editProfileResume: profile.cvSource,
            editProfileAvatar: profile.avatarSource,
            editProfileBanner: profile.bannerSource,
            editProfileLogo: profile.logoSource,
        });
        setSelectedTags(profile.tags)
    }, []);

    return (
        <>
            {/*<p className={s.header}>Добро пожаловать в Portfolio Hub</p>*/}
            <Form className={s.fillProfileForm}>
                <div className={s.block}>
                    <h1 className={s.blockTitle}>Личная информация</h1>
                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='editProfileName'
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
                               registerName='editProfileSurname'
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
                               registerName='editProfileEmail'
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
                               registerName='editProfilePhone'
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
                               registerName='editProfileShortDescription'
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
                    <div className={s.resumeTitles}>
                        <h1 className={s.resumeTitle}>Резюме</h1>
                        <p className={s.blockTitleDescription}>(docx, doc, pdf, txt)</p>
                    </div>

                    <ResumeEdit register={register}
                                registerName='editProfileResume'
                                errors={errors}
                                file={getValues('editProfileResume')}
                                watchResumeFile={watchResumeFile}
                                setValue={setValue}
                                inputId={uuidv4()}
                    />
                </div>

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Социальные сети</h1>
                </div>

                <div className={s.block}>
                    <h1 className={s.resumeTitle}>Аватар профиля</h1>
                    <p className={s.blockTitleDescription}>(png, jpg, jpeg), 150x150px</p>
                    <ImageEdit register={register}
                               registerName='editProfileAvatar'
                               errors={errors}
                               image={getValues('editProfileAvatar')}
                               watchImageFile={watchAvatarImage}
                               setValue={setValue}
                               inputId={uuidv4()}
                    />
                </div>

                <div className={s.block}>
                    <h1 className={s.resumeTitle}>Баннер профиля</h1>
                    <p className={s.blockTitleDescription}>(png, jpg, jpeg), 1000x250px</p>
                    <ImageEdit register={register}
                               registerName='editProfileBanner'
                               errors={errors}
                               image={getValues('editProfileBanner')}
                               watchImageFile={watchBannerImage}
                               setValue={setValue}
                    />
                </div>

                {/*<div className={s.block}>*/}
                {/*    <h1 className={s.resumeTitle}>Логотип портфолио</h1>*/}
                {/*    <p className={s.blockTitleDescription}>(png, jpg, jpeg), 160x150px</p>*/}
                {/*    <ImageEdit register={register}*/}
                {/*               registerName='editProfileLogo'*/}
                {/*               errors={errors}*/}
                {/*               image={getValues('editProfileLogo')}*/}
                {/*               watchImageFile={watchLogoImage}*/}
                {/*               setValue={setValue}*/}
                {/*    />*/}
                {/*</div>*/}

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Опасная зона</h1>
                </div>

                {/*<ImageEdit type="submit">Войти в систему</ImageEdit>*/}
            </Form>


            {/*<ImageEdit onClick={handleSubmit(onSubmit)}>sejkfnsrg</ImageEdit>*/}
        </>
    )
}

export default EditProfileForm;
