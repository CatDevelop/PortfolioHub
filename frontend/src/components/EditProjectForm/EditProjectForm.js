import React, {useEffect, useState} from 'react';
import s from './EditProjectForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ImageEdit from "../ImageEdit/ImageEdit";
import {v4 as uuidv4} from 'uuid';
import {useAuth} from "../../hooks/use-auth";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import DeleteProjectForm from "../DeleteProjectForm/DeleteProjectForm";
import {useForm} from "react-hook-form";

function EditProjectForm(
    {
        register,
        errors,
        reset,
        project,
        getValues,
        watchPreviewImage,
        watchBannerImage,
        setValue,
    }) {
    const user = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register: registerDeleteProject,
        watch: watchDeleteProject,
        handleSubmit: handleSubmitDeleteProject,
        getValues: getValuesDeleteProject,
        reset: resetDeleteProject,
        formState: {errors: errorsDeleteProject}
    } = useForm({
        defaultValues: {
            deleteProjectName: ''
        },
        mode: "onBlur"
    });

    const [deleteProjectModalActive, setDeleteProjectModalActive] = useState(false)

    useEffect(() => {
        reset({
            editProjectName: project.name,
            editProjectShortDescription: project.shortDescription,
            editProjectYear: project.year,
            editProjectPreview: project.preview,
            editProjectBanner: project.image,
        });
    }, []);


    let watchDeleteProjectName = watchDeleteProject("deleteProjectName", "")

    return (
        <>
            {/*<p className={s.header}>Добро пожаловать в Portfolio Hub</p>*/}
            <Form className={s.fillProfileForm}>
                <div className={s.block}>
                    {/*<h1 className={s.blockTitle}>Личная информация</h1>*/}
                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='editProjectName'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                   }
                               }
                               errors={errors}
                               title="Название проекта"
                               require={true}
                               type="text"/>
                        <Input register={register}
                               registerName='editProjectYear'
                               options={
                                   {
                                       pattern: {
                                           value: /^[0-9]{4}$/, message: "Необходимо ввести год (4 цифры)"
                                       }
                                   }
                               }
                               errors={errors}
                               title="Год разработки"
                            // require={true}
                            // isBig={true}
                               type="text"/>
                    </div>
                    <div className={s.fillProfileRow}>
                        <Input register={register}
                               registerName='editProjectShortDescription'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                       maxLength: {
                                           value: 100,
                                           message: "Не более 100 символов"
                                       }
                                   }
                               }
                               errors={errors}
                               title="Описание проекта"
                               require={true}
                            // isBig={true}
                               type="text"/>
                    </div>
                </div>

                <div className={s.images}>
                    <div className={s.block}>
                        <h1 className={s.resumeTitle}>Превью проекта</h1>
                        <p className={s.blockTitleDescription}>(png, jpg, jpeg), 150x150px</p>
                        <ImageEdit register={register}
                                   registerName='editProjectPreview'
                                   errors={errors}
                                   image={getValues('editProjectPreview')}
                                   watchImageFile={watchPreviewImage}
                                   setValue={setValue}
                                   inputId={uuidv4()}
                        />
                    </div>

                    <div className={s.block}>
                        <h1 className={s.resumeTitle}>Баннер проекта</h1>
                        <p className={s.blockTitleDescription}>(png, jpg, jpeg), 1000x250px</p>
                        <ImageEdit register={register}
                                   registerName='editProjectBanner'
                                   errors={errors}
                                   image={getValues('editProjectBanner')}
                                   watchImageFile={watchBannerImage}
                                   setValue={setValue}
                        />
                    </div>
                </div>

                <div className={s.danger}>
                    <div className={s.dangerTitleContainer}>
                        <p className={s.dangerTitle}>Удалить проект</p>
                        <p className={s.dangerDescr}>
                            Как только вы удаляете проект,<br/>
                            пути назад уже нет. Будьте аккуратны!
                        </p>

                    </div>
                    <Button isSecond click={() => {
                        setDeleteProjectModalActive(true)
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                                stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Удалить проект
                    </Button>
                </div>
            </Form>
            <ModalWindow active={deleteProjectModalActive}
                         setActive={setDeleteProjectModalActive}
                         onClose={() => {
                             resetDeleteProject()
                         }}>
                <DeleteProjectForm handleSubmit={handleSubmitDeleteProject}
                                   errors={errorsDeleteProject}
                                   register={registerDeleteProject}
                                   userID={user.id}
                                   projectID={project.id}
                                   projectName={project.name}
                                   getValues={getValuesDeleteProject}
                                   watchDeleteProjectName={watchDeleteProjectName}
                />
            </ModalWindow>
        </>
    )
}

export default EditProjectForm;
