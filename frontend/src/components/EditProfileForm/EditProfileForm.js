import React, {useEffect, useState} from 'react';
import s from './EditProfileForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import TagInput from "../TagInput/TagInput";
import ResumeEdit from "../ResumeEdit/ResumeEdit";
import ImageEdit from "../ImageEdit/ImageEdit";
import {v4 as uuidv4} from 'uuid';
import EditEmail from "../EditEmail/EditEmail";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import DeletePortfolioForm from "../DeletePortfolioForm/DeletePortfolioForm";
import ChangeVisibleForm from "../ChangeVisibleForm/ChangeVisibleForm";

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
        setValue,
        isVisibleEmail,
        setIsVisibleEmail
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
        setIsVisibleEmail(profile.isVisibleEmail)
    }, []);


    const {
        register: registerDeletePortfolio,
        watch: watchDeletePortfolio,
        handleSubmit: handleSubmitDeletePortfolio,
        getValues: getValuesDeletePortfolio,
        reset: resetDeletePortfolio,
        formState: {errors: errorsDeletePortfolio}
    } = useForm({
        defaultValues: {
            deletePortfolioName: ''
        },
        mode: "onBlur"
    });

    const {register: registerChangeVisible, handleSubmit: handleSubmitChangeVisible} = useForm({
        defaultValues: {},
        mode: "onBlur"
    });

    const status = [
        {value: "Public", label: "Публичное"},
        {value: "Link", label: "По ссылке"},
        {value: "Private", label: "Приватное"},
    ]


    const [visibleChangeModalActive, setVisibleChangeModalActive] = useState(false)
    const [deleteAccountModalActive, setDeleteAccountModalActive] = useState(false)
    const [selectVisibleStatus, setSelectVisibleStatus] = useState(status.find(s => s.value === profile.visible))

    let watchDeletePortfolioName = watchDeletePortfolio("deletePortfolioName", "")

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
                               registerName='editProfileSurname'
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
                        <EditEmail register={register}
                                   errors={errors}
                                   isVisibleEmail={isVisibleEmail}
                                   setIsVisibleEmail={setIsVisibleEmail}
                        />
                        <Input register={register}
                               registerName='editProfilePhone'
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
                               registerName='editProfileShortDescription'
                               errors={errors}
                               title="О себе"
                               options={
                                   {
                                       maxLength: {
                                           value: 500,
                                           message: "Не более 500 символов"
                                       }
                                   }
                               }
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

                <div className={s.block}>
                    <h1 className={s.blockTitle}>Опасная зона</h1>


                    <div className={s.danger}>
                        <div className={s.dangerContainer}>
                            <div className={s.dangerTitleContainer}>
                                <p className={s.dangerTitle}>Изменить видимость портфолио</p>
                                <p className={s.dangerDescr}>
                                    {
                                        profile.visible === "Private" ? "Сейчас портфолио никому не видно" :
                                            profile.visible === "Link" ? "Сейчас портфолио доступно по ссылке" :
                                                "Сейчас портфолио публично"
                                    }
                                </p>
                            </div>
                            <Button isSecond click={() => {
                                setVisibleChangeModalActive(true)
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                        stroke="#111827" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M2.45898 12C3.73326 7.94288 7.52354 5 12.0012 5C16.4788 5 20.2691 7.94291 21.5434 12C20.2691 16.0571 16.4788 19 12.0012 19C7.52354 19 3.73324 16.0571 2.45898 12Z"
                                        stroke="#111827" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                Изменить видимость
                            </Button>
                        </div>
                        <div className={s.dangerContainer}>
                            <div className={s.dangerTitleContainer}>
                                <p className={s.dangerTitle}>Удалить аккаунт и портфолио</p>
                                <p className={s.dangerDescr}>
                                    Как только вы удаляете репозиторий,<br/>
                                    пути назад уже нет. Будьте аккуратны
                                </p>
                            </div>

                            <Button isSecond click={() => {
                                setDeleteAccountModalActive(true)
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                                        stroke="#111827" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                Удалить аккаунт и портфолио
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>

            <ModalWindow active={deleteAccountModalActive}
                         setActive={setDeleteAccountModalActive}
                         onClose={() => {
                             resetDeletePortfolio()
                         }}>
                <DeletePortfolioForm handleSubmit={handleSubmitDeletePortfolio}
                                     errors={errorsDeletePortfolio}
                                     register={registerDeletePortfolio}
                                     userID={profile.id}
                                     portfolioName={profile.surname + " " + profile.name}
                                     getValues={getValuesDeletePortfolio}
                                     watchDeleteProjectName={watchDeletePortfolioName}
                />
            </ModalWindow>

            {
                selectVisibleStatus ? <ModalWindow active={visibleChangeModalActive}
                                                   setActive={setVisibleChangeModalActive}
                                                   onClose={() => {
                                                       setSelectVisibleStatus(status.find(s => s.value === profile.visible))
                                                   }}>
                    <ChangeVisibleForm setSelectVisibleStatus={setSelectVisibleStatus}
                                       selectVisibleStatus={selectVisibleStatus}
                                       handleSubmit={handleSubmitChangeVisible}
                                       setActive={setVisibleChangeModalActive}
                                       userID={profile.id}

                    />
                </ModalWindow> : <></>
            }


        </>
    )
}

export default EditProfileForm;
