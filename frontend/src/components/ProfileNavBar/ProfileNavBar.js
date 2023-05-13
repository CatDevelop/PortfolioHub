import React, {useRef} from 'react';
import s from './ProfileNavBar.module.css';
import Avatar from '../../assets/img/Av1.png'
import {Link, useNavigate} from "react-router-dom";
import {removeUser} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import classNames from "classnames/bind";
import LKIcon from '../../assets/img/LKIcon.svg'
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import Button from "../Button/Button";
import NavigateButton from "../NavigateButton/NavigateButton";
import {removeProfile} from "../../store/slices/profileSlice";

function ProfileNavBar(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const logout = () => {
        debugger
        dispatch(removeProfile());
        dispatch(removeUser());
        navigate("/");
    };

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => {setIsActive(!isActive); console.log(isActive)};

    return (
        <div className={s.container}>
            <div className={s.leftContainer}>
                <div className={classNames(s.lk, props.isProfile? s.navbarLinkActive : "")}>
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.3327 9.33333C21.3327 12.2789 18.9449 14.6667 15.9993 14.6667C13.0538 14.6667 10.666 12.2789 10.666 9.33333C10.666 6.38781 13.0538 4 15.9993 4C18.9449 4 21.3327 6.38781 21.3327 9.33333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.9993 18.6667C10.8447 18.6667 6.66602 22.8453 6.66602 28H25.3327C25.3327 22.8453 21.154 18.6667 15.9993 18.6667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Link className={s.navbarLink} to={"/"+props.userID+"/profile"}>Личная информация</Link>
                </div>

                <div className={classNames(s.favourite, props.isProfile? "" : s.navbarLinkActive)}>
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75736 8.42411C3.41421 10.7673 3.41421 14.5662 5.75736 16.9094L16.0001 27.1521L26.2426 16.9094C28.5858 14.5662 28.5858 10.7673 26.2426 8.42411C23.8995 6.08096 20.1005 6.08096 17.7574 8.42411L16.0001 10.1815L14.2426 8.42411C11.8995 6.08096 8.10051 6.08096 5.75736 8.42411Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Link className={s.navbarLink} to={"/"+props.userID+"/profile/favourite"}>Избранное</Link>
                </div>

            </div>

            {
                props.isProfile ?
                    props.edit ?
                        <div className={s.rightContainer}>
                            <Button onClick={props.save}>Сохранить изменения</Button>
                        </div>

                        :

                        <div className={s.rightContainer}>
                            <div className="menu-container">
                                <button onClick={onClick} className="menu-trigger">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 24H10.02M24 24H24.02M38 24H38.02M12 24C12 25.1046 11.1046 26 10 26C8.89543 26 8 25.1046 8 24C8 22.8954 8.89543 22 10 22C11.1046 22 12 22.8954 12 24ZM26 24C26 25.1046 25.1046 26 24 26C22.8954 26 22 25.1046 22 24C22 22.8954 22.8954 22 24 22C25.1046 22 26 22.8954 26 24ZM40 24C40 25.1046 39.1046 26 38 26C36.8954 26 36 25.1046 36 24C36 22.8954 36.8954 22 38 22C39.1046 22 40 22.8954 40 24Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <nav
                                    ref={dropdownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        <li>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.2322 5.2459L18.7677 8.78144M16.7322 3.7459C17.7085 2.76959 19.2914 2.76959 20.2677 3.7459C21.244 4.72222 21.244 6.30513 20.2677 7.28144L6.5 21.0492H3V17.4781L16.7322 3.7459Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <Link to='./edit'>Редактировать</Link>
                                        </li>
                                        <li>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 15.0137V17.0137M6 21.0137H18C19.1046 21.0137 20 20.1182 20 19.0137V13.0137C20 11.9091 19.1046 11.0137 18 11.0137H6C4.89543 11.0137 4 11.9091 4 13.0137V19.0137C4 20.1182 4.89543 21.0137 6 21.0137ZM16 11.0137V7.01367C16 4.80453 14.2091 3.01367 12 3.01367C9.79086 3.01367 8 4.80453 8 7.01367V11.0137H16Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            </svg>
                                            <a onClick={()=>props.setChangePasswordModalActive(true)}>Сменить пароль</a>
                                        </li>
                                        <li className={s.dropdownQuit}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 16.0137L7 12.0137M7 12.0137L11 8.01367M7 12.0137L21 12.0137M16 16.0137V17.0137C16 18.6705 14.6569 20.0137 13 20.0137H6C4.34315 20.0137 3 18.6705 3 17.0137V7.01367C3 5.35682 4.34315 4.01367 6 4.01367H13C14.6569 4.01367 16 5.35682 16 7.01367V8.01367" stroke="#E24444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <a onClick={logout}>Выйти из аккаунта</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/*<a className={s.quit} onClick={logout}>Выйти</a>*/}
                        </div>
                 : <></>
            }




        </div>
    )
}

export default ProfileNavBar;
