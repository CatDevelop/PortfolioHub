import React from 'react';
import s from './ProjectInformationBlock.module.css';
import {Link} from "react-router-dom";
import ProjectInformationRow from "../ProjectInformationRow/ProjectInformationRow";

function ProjectInformationBlock(props) {
    return (
        <div className={s.projectInformationBlock}>
            {props.informationBlocks.map(el => {
                return <ProjectInformationRow type={el.blockType} title={el.blockTitle} content={el.content}/>
            }
            )}
        </div>
    )
}

export default ProjectInformationBlock;