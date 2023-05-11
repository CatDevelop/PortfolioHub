import React from 'react';
import s from './ProjectInformationRow.module.css';
import {Link} from "react-router-dom";

function ProjectInformationRow(props) {
    return (
        <div className={s.projectInformationRow}>
            <div className={s.title}>{props.title}</div>

            {props.type === "Link"?
                <a className={s.link} href={props.content}>{props.content}</a>:
                <div className={s.text}>{props.content}</div>
            }


        </div>
    )
}

export default ProjectInformationRow;