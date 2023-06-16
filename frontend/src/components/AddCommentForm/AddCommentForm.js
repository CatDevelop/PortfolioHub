import React, {useState} from 'react';
import s from './AddCommentForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {addComment} from "../../store/slices/projectSlice";
import {useAuth} from "../../hooks/use-auth";

function AddCommentForm(props) {
    const dispatch = useDispatch();
    const user = useAuth()

    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = (payload) => {
        if(!isLoading)
        {
            setIsLoading(true);
            if (user.isAuth)
                dispatch(addComment({
                    projectID: props.projectID,
                    text: payload.commentText,
                    userID: user.id
                })).then(response=>{
                    setIsLoading(false)
                })
            else
                dispatch(addComment({
                    projectID: props.projectID,
                    email: payload.commentEmail,
                    text: payload.commentText
                })).then(response=>{
                    setIsLoading(false)
                })
            props.reset()
            window.scrollTo(0, document.body.scrollHeight + 100);
        }
    }

    return (
        <>
            <Form className={s.authorizationForm} onSubmit={props.handleSubmit(onSubmit)}>
                {
                    !user.isAuth ?
                        <Input register={props.register}
                               registerName='commentEmail'
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
                               errors={props.errors}
                               title="Почта"
                               require={true}
                               type="text"
                               isBig
                        /> : <></>
                }
                <Input register={props.register}
                       registerName='commentText'
                       options={
                           {
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                           }
                       }
                       errors={props.errors}
                       title={"Текст комментария"}
                       require={true}
                       as={"textarea"}
                       type="text"
                       isBig
                />

                <Button type="submit">Отправить</Button>
            </Form>
        </>
    )
}

export default AddCommentForm;
