import React from 'react';
import s from './ProjectsTable.module.css';
import {ProjectCard} from "../ProjectCard/ProjectCard";
import projectImage0 from "../../assets/img/CDlogoAutoMagShina.png";
import classNames from "classnames/bind";
import {AddProjectCard} from "../AddProjectCard/AddProjectCard";
function ProjectsTable(props) {
    return (
        <div className={classNames(s.projectsTable, props.edit?s.edit:"")}>
            <div className={s.title}>
                <div className={s.headerContainer}>
                    <h3 className={s.header}>
                        {props.title}
                    </h3>
                    {
                        props.edit?
                            <div className={s.delete} onClick={() => props.deleteCategory(props.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#E24444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div> : <></>
                    }

                </div>

                {
                    props.description?
                        <h5 className={s.description}>
                            {props.description}
                        </h5> : <></>
                }
            </div>


            <p className={s.projectsTableContent}>
                {
                    props.edit?<AddProjectCard
                        categoryName={props.title}
                        categoryID={props.id}
                        importProjectModalActive={props.importProjectModalActive}
                        setImportProjectModalActive={props.setImportProjectModalActive}
                        importProjectCategoryID={props.importProjectCategoryID}
                        setImportProjectCategoryID={props.setImportProjectCategoryID}
                        addProjectModalActive={props.addProjectModalActive}
                        setAddProjectModalActive={props.setAddProjectModalActive}
                        addProjectCategoryID={props.addProjectCategoryID}
                        setAddProjectCategoryID={props.setAddProjectCategoryID}
                    />:<></>
                }

                {
                    props.projects.length !== 0 ?
                    props.projects.map(project => {
                        return <ProjectCard title={project.name}
                                            projectID={project.id}
                                            userID={props.userID}
                                            categoryID={props.id}
                                            description={project.shortDescription}
                                            imgUrl={project.previewSource}
                                            likesCount={project.likesCount}
                                            edit={props.edit}
                                            deleteFromCategory={props.deleteFromCategory}
                        />
                    }) : <p> {props.edit?"":"Нет проектов"}</p>
                }
            </p>
            {
                !props.edit?<hr className={s.Divider}/>:<></>
            }
        </div>
    )
}

export default ProjectsTable;
