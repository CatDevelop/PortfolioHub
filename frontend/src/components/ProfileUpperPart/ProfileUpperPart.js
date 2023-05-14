import React from 'react';
import s from './ProfileUpperPart.module.css';
import Avatar from '../../assets/img/Av1.png'

import LikeIcon from '../../assets/img/LikeIcon.svg'
import ProjectsIcon from '../../assets/img/ProjectsIcon.svg'

function ProfileUpperPart(props) {
    return (
        <div className={s.container}>
            <div className={s.leftContainer}>
                <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/avatars/"+props.avatar} alt="" className={s.avatar}/>
                <div className={s.nameAndDescription}>
                    <p className={s.name}>{props.surname} {props.name}</p>
                    <p className={s.description}>{props.shortDescription}</p>
                </div>
            </div>

            <div className={s.likesAndProjects}>
                <div className={s.likes}>
                    <img className={s.likeIcon} src={LikeIcon} alt={'like'}/>
                    <p className={s.likesCount}>{props.likes}</p>
                </div>

                <div className={s.projects}>
                    <img className={s.projectsIcon} src={ProjectsIcon} alt={'like'}/>
                    <p className={s.projectsCount}>{props.projects}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpperPart;
