import React from "react";
import s from './UserCard.module.css';
import {useDispatch} from "react-redux";
import {deleteProjectFromCategory} from "../../store/slices/projectsSlice";
import {useNavigate} from "react-router-dom";


export const UserCard = ({userID, title, description, imgUrl, likesCount}) => {
    console.log("USERID", userID)
    const navigate = useNavigate();
    return (
        <div className={s.userCard} onClick={()=>navigate("/"+userID)}>
            <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/avatars/" + imgUrl}
                 className={s.projectCardImage} alt=""/>
            <div className={s.downContainer}>
                <div className={s.downLeftContainer}>
                    <h3 className={s.projectCardHeader}>{title}</h3>
                    <h6 className={s.projectCardDescription}>{description}</h6>
                </div>
                <div className={s.downRightContainer}>
                    <div className={s.likes}>
                        <svg width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="19" cy="19" r="19" fill="#737373"/>
                            <path
                                d="M11.318 13.318C9.56066 15.0754 9.56066 17.9246 11.318 19.682L19.0001 27.364L26.682 19.682C28.4393 17.9246 28.4393 15.0754 26.682 13.318C24.9246 11.5607 22.0754 11.5607 20.318 13.318L19.0001 14.6361L17.682 13.318C15.9246 11.5607 13.0754 11.5607 11.318 13.318Z"
                                stroke="#F086CB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className={s.likesCount}>{likesCount}</p>
                    </div>

                    <p className={s.date}>12/03/23</p>
                </div>
            </div>
        </div>
    )
}
