import React from "react";
import s from './ProjectCard.module.css';
import {useDispatch} from "react-redux";
import {deleteProjectFromCategory} from "../../store/slices/projectsSlice";
import {useNavigate} from "react-router-dom";


export const ProjectCard = ({userID, categoryID, projectID, title, description, imgUrl, likesCount, edit=false, deleteFromCategory}) => {
    const navigate = useNavigate();
    return (
        <div className={s.projectCard} onClick={()=>navigate("/"+userID+"/project/"+projectID)}>
            {
                edit ?
                    <div className={s.deleteProject} onClick={e=>{
                        deleteFromCategory(categoryID, projectID)
                        if (!e) e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                    }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                                  fill="#313134"/>
                        </svg>
                    </div> : <></>
            }

            {/*<img src={imgUrl} className={s.projectCardImage} alt=""/>*/}
            <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/projectPreviews/" + imgUrl}
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
