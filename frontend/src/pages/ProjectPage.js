import React, {useEffect} from "react";
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";

import testImage from "../assets/img/project-img1.png";

import projectImage0 from "../assets/img/CDlogoAutoMagShina.png";
import projectImage1 from "../assets/img/CDlogoUralMebel.png";
import projectImage2 from "../assets/img/project-img2.png";
import projectImage11 from "../assets/img/project-img11.png";
import projectImage15 from "../assets/img/CDlogoHeroReturn.png";
import {getProfile} from "../store/slices/profileSlice";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";


export const ProjectPage = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(projectId));
    }, []);
    debugger
    return (
        <div>
            <ConsoleAndPhoto/>
            {
                /*categories.map(c => {
                    return <ProjectsTable title={c.title} projects={projects.filter(p => p.categoryId === c.id)}/>
                })*/
            }
        </div>
    )
}