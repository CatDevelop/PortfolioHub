import React from 'react';
import s from './Comment.module.css';
import Avatar from '../../assets/img/Av1.png'

import LikeIcon from '../../assets/img/LikeIcon.svg'
import ProjectsIcon from '../../assets/img/ProjectsIcon.svg'

function Comment(props) {
    return (
        <div className={s.container}>
            <div className={s.leftContainer}>
                <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/avatars/"+props.comment.avatar} alt="" className={s.avatar}/>
                <div className={s.nameAndDescription}>
                    <p className={s.name}>{props.comment.login}</p>
                    <p className={s.description}>{props.comment.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;
