import React from 'react';
import s from './DeleteProjectForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {deleteProject} from "../../store/slices/projectSlice";
import {useNavigate} from "react-router-dom";

function DeleteProjectForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (payload) => {
        dispatch(deleteProject({projectID: props.projectID, userID: props.userID})).then(() => {
            navigate("/" + props.userID + "/projects")
        })
    }

    console.log("deleteProjectName", props.getValues("deleteProjectName"))

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                <p className={s.authorization}>Удаление проекта</p>
                <p className={s.danger}>Для подтверждения напишите "{props.projectName}" в поле ниже</p>

                <Input register={props.register}
                       registerName='deleteProjectName'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                           }
                       }
                       errors={props.errors}
                       type="text"
                />
                <Button type="submit" isSecond disabled={props.getValues("deleteProjectName") !== props.projectName}>Удалить
                    проект</Button>
            </Form>
        </>
    )
}

export default DeleteProjectForm;
