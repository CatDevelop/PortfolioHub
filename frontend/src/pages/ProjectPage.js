import React, {useEffect} from 'react';
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "../components/NavBar/NavBar1.module.css";
import {Link, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import PortfolioNavBar from "../components/PortfolioNavBar/PortfolioNavBar";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {useAuth} from "../hooks/use-auth";
import {NotFoundPage} from "./NotFoundPage";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotActivateAccount} from "./NotActivateAccount";
import {getPortfolio} from "../store/slices/portfolioSlice";
import {usePortfolio} from "../hooks/use-portfolio";
import Loading from "../components/Loading/Loading";
import Portfolio from "../components/Portfolio/Portfolio";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import {useProject} from "../hooks/use-project";
import {getProject} from "../store/slices/projectSlice";
import ProjectNavBar from "../components/ProjectNavBar/ProjectNavBar";
import ProjectUpperPart from "../components/ProjectUpperPart/ProjectUpperPart";
import ProjectImage from "../assets/img/ProjectImage.png"

export const ProjectPage = () => {
    const {userId, projectId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getProject(projectId));
        debugger
    }, []);

    const user = useAuth();
    const profile = useProfile();
    const project = useProject();


    if (!profile.activate && user.id === profile.id)
        return <NotActivateAccount userID={user.id}/>

    if (project.isLoading)
        return <Loading/>

    if (!profile.name && user.id === profile.id)
        return <NotFilledAccount userID={user.id}/>

    if (!profile.id || !profile.name)
        return <NotFoundPage/>

    let breadcrumbs = [
        {id: 1, title: profile.surname + " " + profile.name, src: "/" + userId},
        {id: 2, title: "Проекты", src: "/" + userId + "/projects"},
        {id: 3, title: project.name, year: project.year ?? ""},
    ]

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
            <ProjectUpperPart name={project.name}
                              banner={project.image}
                              shortDescription={project.shortDescription}
                              likes={profile.likesCount}
                              edit={false}
                              yourAccount={user.id === profile.id}
            />
            <ProjectNavBar userID={profile.id}
                           edit={false}
            />
            <Portfolio portfolio={project.blocks}/>
        </div>
    )
}
