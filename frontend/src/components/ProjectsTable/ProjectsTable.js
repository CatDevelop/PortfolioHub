import React from 'react';
import s from './ProjectsTable.module.css';
import {ProjectCard} from "../ProjectCard/ProjectCard";
import projectImage0 from "../../assets/img/CDlogoAutoMagShina.png";
function ProjectsTable(props) {
    return (
        <div className={s.projectsTable}>
            <h3 className={s.header}>
                {props.title}
            </h3>
            <p className={s.projectsTableContent}>
                {
                    props.projects.map(project => {
                        return <ProjectCard title={project.name}
                                            description={project.shortDescription}
                                            imgUrl={project.previewSource}
                                            likesCount={project.likesCount}
                        />
                    })
                }
            </p>
            <hr className={s.Divider}/>
        </div>
    )
}

export default ProjectsTable;
