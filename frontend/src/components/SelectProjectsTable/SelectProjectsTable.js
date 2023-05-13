import React, {useState} from 'react';
import s from './SelectProjectsTable.module.css';
import {ProjectCard} from "../ProjectCard/ProjectCard";
import projectImage0 from "../../assets/img/CDlogoAutoMagShina.png";
import classNames from "classnames/bind";
import {AddProjectCard} from "../AddProjectCard/AddProjectCard";
import {SelectProjectCard} from "../SelectProjectCard/SelectProjectCard";
function SelectProjectsTable(props) {

    return (
        <div className={s.projectsTable}>
            <p className={s.projectsTableContent}>
                {
                    props.projects.length !== 0 ?
                    props.projects.map(project => {
                        return <SelectProjectCard title={project.name}
                                                  id={project.id}
                                                  description={project.shortDescription}
                                                  imgUrl={project.previewSource}
                                                  likesCount={project.likesCount}
                                                  selectProjectID={props.selectProjectID}
                                                  setSelectProjectID={props.setSelectProjectID}
                        />
                    }) : <p> {props.edit?"":"Нет проектов для импорта"}</p>
                }
            </p>
        </div>
    )
}

export default SelectProjectsTable;
