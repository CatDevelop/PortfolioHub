import React, {useEffect} from "react";
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProjectDescription from "../components/ProjectDescription/ProjectDescription";
import ProjectInformationBlock from "../components/ProjectInformationBlock/ProjectInformationBlock";
import {useProfile} from "../hooks/use-profile";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getProjects} from "../store/slices/projectsSlice";
import {useProjects} from "../hooks/use-projects";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {getPortfolio} from "../store/slices/portfolioSlice";
import {useAuth} from "../hooks/use-auth";
import {usePortfolio} from "../hooks/use-portfolio";
import {NotActivateAccount} from "./NotActivateAccount";
import Loading from "../components/Loading/Loading";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotFoundPage} from "./NotFoundPage";
import FavouriteProjects from "../components/FavouriteProjects/FavouriteProjects";

export const ProjectsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(userId));
        // dispatch(getPortfolio(userId));
        dispatch(getProjects(userId));
        debugger
    }, []);

    const user = useAuth();

    const profile = useProfile();
    const projects = useProjects();
    console.log(projects);

    if(!profile.activate && user.id===profile.id)
        return <NotActivateAccount userID={user.id}/>

    if (projects.isLoading)
        return <Loading/>

    if(!profile.name && user.id===profile.id)
        return <NotFilledAccount userID={user.id}/>

    if(!profile.id || !profile.name)
        return <NotFoundPage/>

    return (
        <div>
            <PortfolioUpperPart name={profile.name}
                                surname={profile.surname}
                                avatar={profile.avatarSource}
                                banner={profile.bannerSource}
                                tags={profile.tags}
                                shortDescription={profile.shortDescription}
                                likes={profile.likesCount}
                                projects={profile.projectsCount}
                                edit={false}
                                yourAccount={user.id === profile.id}
            />

            {
                projects.categories.length !== 0 ?
                projects.categories.map(projectCategory => {
                    return <ProjectsTable projects={projectCategory.projects}
                                          title={projectCategory.name}
                                          userID={userId}
                    />
                }) : <p>Нет проектов</p>
            }
        </div>
    )
}
