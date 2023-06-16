import React, {useEffect} from "react";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import {useProfile} from "../hooks/use-profile";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getProjects} from "../store/slices/projectsSlice";
import {useProjects} from "../hooks/use-projects";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {useAuth} from "../hooks/use-auth";
import {NotActivateAccount} from "./NotActivateAccount";
import Loading from "../components/Loading/Loading";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotFoundPage} from "./NotFoundPage";
import {removeProject} from "../store/slices/projectSlice";

export const ProjectsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getProjects(userId));
        dispatch(removeProject());
        debugger
    }, []);

    const user = useAuth();

    const profile = useProfile();
    const projects = useProjects();
    console.log(projects);

    if (profile.isLoading || projects.isLoading)
        return <Loading/>

    if(!profile.activate && user.id===profile.id)
        return <NotActivateAccount userID={user.id}/>

    if(!profile.name && user.id===profile.id)
        return <NotFilledAccount userID={user.id}/>

    if(!profile.id || !profile.name || (profile.visible === "Private" && user.id!==profile.id))
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
