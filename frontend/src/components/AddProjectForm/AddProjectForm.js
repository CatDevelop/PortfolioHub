import React from 'react';
import s from './AddProjectForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";
import {addProject, uploadPreview} from "../../store/slices/projectSlice";
import ResumeEdit from "../ResumeEdit/ResumeEdit";
import ImageEdit from "../ImageEdit/ImageEdit";
import {uploadResume} from "../../store/slices/profileSlice";

function AddProjectForm(props) {
    const dispatch = useDispatch();


    const onSubmit = (payload) => {
        // payload.authorizationPassword = md5(payload.authorizationPassword);
        const data = {
            userID: props.userID,
            projectName: payload.addProjectName,
            projectDescription: payload.addProjectDescription
        };

        if (payload.addProjectYear)
            data["projectYear"] = payload.addProjectYear;

        if (props.addProjectCategoryID)
            data["projectCategoryID"] = props.addProjectCategoryID.id;

        console.log(data);
        dispatch(addProject(data)).then((dispatchPayload) => {

            if (payload.addProjectPreviewSource) {
                dispatch(uploadPreview(
                    {
                        userID: props.userID,
                        projectID: dispatchPayload.payload.data.projectID,
                        file: payload.addProjectPreviewSource[0]
                    }
                ));
            }

            props.reset();
            props.setAddProjectCategoryID(null);
            props.setAddProjectModalActive(false);
        });
    }

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                <p className={s.authorization}>Добавить новый
                    проект {props.addProjectCategoryID ? "в категорию " + props.addProjectCategoryID.name : ""}</p>
                <Input register={props.register}
                       registerName='addProjectName'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={props.errors}
                       title="Название проекта"
                       require={true}
                       type="text"/>
                <Input register={props.register}
                       registerName='addProjectDescription'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={props.errors}
                       title="Описание проекта"
                       require={true}
                       type="text"/>
                <Input register={props.register}
                       registerName='addProjectYear'
                       errors={props.errors}
                       title="Год разработки"
                       type="number"/>

                <div className={s.previewContainer}>
                    <div>
                        <p className={s.previewTitle}>Превью проекта</p>
                        <p className={s.previewTitleDescription}>(png, jpg, jpeg), 300x150px</p>
                    </div>
                    <ImageEdit register={props.register}
                               registerName='addProjectPreviewSource'
                               errors={props.errors}
                               image={props.getValues('addProjectPreviewSource')}
                               watchImageFile={props.watchImageFile}
                               setValue={props.setValue}
                    />
                </div>


                <Button type="submit">Добавить проект</Button>
            </Form>
        </>
    )
}

export default AddProjectForm;
