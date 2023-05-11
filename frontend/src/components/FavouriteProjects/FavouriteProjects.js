import React from 'react';
import s from './FavouriteProjects.module.css';
import {Link} from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import ProjectsTable from "../ProjectsTable/ProjectsTable";

function FavouriteProjects(props) {
    return (
        <div className={s.favouriteProjects}>
            <h1 className={s.pageTitle}>Избранные проекты</h1>
            <ProjectsTable projects={props.projects}/>
        </div>
    )
}

export default FavouriteProjects;
