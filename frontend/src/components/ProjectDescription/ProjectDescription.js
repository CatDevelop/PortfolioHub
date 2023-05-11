import React from 'react';
import s from './ProjectDescription.module.css';
import {Link} from "react-router-dom";

function ProjectDescription(props) {
    return (
        <div className={s.projectDescription}>
            {props.text}
        </div>
    )
}

export default ProjectDescription;