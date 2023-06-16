import React, {useRef} from 'react';
import s from './ProjectNavBar.module.css';
import Avatar from '../../assets/img/Av1.png'
import {Link, useNavigate} from "react-router-dom";
import {removeUser} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import classNames from "classnames/bind";
import LKIcon from '../../assets/img/LKIcon.svg'
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import Button from "../Button/Button";
import NavigateButton from "../NavigateButton/NavigateButton";
import DownloadFileButton from "../DownloadFileButton/DownloadFileButton";

function ProjectNavBar(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => {setIsActive(!isActive); console.log(isActive)};

    return (
        <div className={s.container}>
            <div className={s.leftContainer}>
                <div className={s.resume}>
                    {
                        props.edit ? <>
                            <Button click={props.save}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 11L12 14M12 14L9 11M12 14L12 4" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Сохранить изменение
                            </Button>
                        </> :
                            <Button click={()=>navigate("./edit")}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Редактировать проект
                            </Button>
                    }
                    <br/>
                </div>
            </div>

            {
                props.edit ? <div>
                    <p className={s.editTitle}>Режим редактирования</p>
                </div> : <></>
            }


            <div className={s.rightContainer}>
                <div>
                    <NavigateButton link={"/" + props.userID + "/projects"}>
                        Список проектов
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3499 3.95157C12.8185 3.48294 13.5783 3.48294 14.047 3.95157L21.247 11.1516C21.7156 11.6202 21.7156 12.38 21.247 12.8486L14.047 20.0486C13.5783 20.5173 12.8185 20.5173 12.3499 20.0486C11.8813 19.58 11.8813 18.8202 12.3499 18.3516L17.5014 13.2001L3.59844 13.2001C2.9357 13.2001 2.39844 12.6628 2.39844 12.0001C2.39844 11.3374 2.9357 10.8001 3.59844 10.8001H17.5014L12.3499 5.64863C11.8813 5.18 11.8813 4.4202 12.3499 3.95157Z" fill="#111827"/>
                        </svg>
                    </NavigateButton>
                </div>
            </div>
        </div>
    )
}

export default ProjectNavBar;
