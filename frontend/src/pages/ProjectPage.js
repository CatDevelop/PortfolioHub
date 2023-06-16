import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import {useAuth} from "../hooks/use-auth";
import {NotFoundPage} from "./NotFoundPage";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotActivateAccount} from "./NotActivateAccount";
import Loading from "../components/Loading/Loading";
import Portfolio from "../components/Portfolio/Portfolio";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import {useProject} from "../hooks/use-project";
import {getProject} from "../store/slices/projectSlice";
import ProjectNavBar from "../components/ProjectNavBar/ProjectNavBar";
import ProjectUpperPart from "../components/ProjectUpperPart/ProjectUpperPart";
import {useFavouriteProjects} from "../hooks/use-favourite-projects";
import {getFavouriteProjects} from "../store/slices/favouriteProjectsSlice";
import {useForm} from "react-hook-form";
import AddCommentForm from "../components/AddCommentForm/AddCommentForm";
import AddProjectForm from "../components/AddProjectForm/AddProjectForm";
import Comment from "../components/Comment/Comment";
import s from "./Pages.module.css"

export const ProjectPage = () => {
    const {userId, projectId} = useParams();
    const dispatch = useDispatch();

    const favouriteProjects = useFavouriteProjects()
    const user = useAuth()
    const profile = useProfile()
    const project = useProject();

    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getProject(projectId));
    }, []);

    useEffect(() => {
        if(user.id)
            dispatch(getFavouriteProjects(user.id));
    }, [user.id]);


    const {register: registerAddComment, handleSubmit: handleSubmitAddComment, setValue: setValueAddComment, reset: resetAddComment, getValues: getValuesAddComment, formState: {errors: errorsAddComment}} = useForm({
        defaultValues:  {
            commentText: "",
            commentEmail: "",
        },
        mode: "onBlur"
    });




    if (profile.isLoading || project.isLoading)
        return <Loading/>

    if(!profile.id || (!profile.name && user.id!==profile.id) || (profile.visible === "Private" && user.id!==profile.id))
        return <NotFoundPage/>

    if (!profile.activate && user.id === profile.id)
        return <NotActivateAccount userID={user.id}/>


    if (!profile.name && user.id === profile.id)
        return <NotFilledAccount userID={user.id}/>


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
                              likes={project.rating}
                              ownerID={project.userId}
                              edit={false}
                              projectID={project.id}
                              yourAccount={user.id === profile.id}
                              favouriteProjects={favouriteProjects}
            />
            <ProjectNavBar userID={user.id}
                           edit={false}
            />
            <Portfolio portfolio={project.blocks}/>
            <div className={s.projectCommentsTitleContainer}>
                <h1 className={s.projectCommentsTitle}>Комментарии</h1>
            </div>
            <AddCommentForm register={registerAddComment}
                            handleSubmit={handleSubmitAddComment}
                            reset={resetAddComment}
                            errors={errorsAddComment}
                            projectID={projectId}
                            profile={profile}
            />
            {
                project.comments.map(comment => {
                    return <Comment comment={comment}/>
                })
            }
        </div>
    )
}
