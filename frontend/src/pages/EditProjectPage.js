import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import EditorJS from "../components/EditorJS/EditorJS";
import {useAuth} from "../hooks/use-auth";
import Loading from "../components/Loading/Loading";
import {getProject, updateProject, uploadProjectImage, uploadProjectPreview} from "../store/slices/projectSlice";
import {useProject} from "../hooks/use-project";
import {NotActivateAccount} from "./NotActivateAccount";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotFoundPage} from "./NotFoundPage";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProjectUpperPart from "../components/ProjectUpperPart/ProjectUpperPart";
import ProjectNavBar from "../components/ProjectNavBar/ProjectNavBar";
import EditProjectForm from "../components/EditProjectForm/EditProjectForm";
import {useForm} from "react-hook-form";
import {useFavouriteProjects} from "../hooks/use-favourite-projects";
import {getFavouriteProjects} from "../store/slices/favouriteProjectsSlice";

export const EditProjectPage = () => {
    const { userId, projectId } = useParams();
    const dispatch = useDispatch();

    const favouriteProjects = useFavouriteProjects()
    const user = useAuth();
    const project = useProject();
    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getProject(projectId));
        debugger
    }, []);

    useEffect(() => {
        if(user.id)
            dispatch(getFavouriteProjects(user.id));
    }, [user.id]);

    const defaultValues = {
        editProjectName: project.name,
        editProjectShortDescription: project.shortDescription,
        editProjectYear: project.year,
        editProjectPreview: '',
        editProjectBanner: '',
    }

    const {register, handleSubmit, setValue, reset, watch, getValues, formState: {errors}} = useForm({
        defaultValues: defaultValues,
        mode: "onBlur"
    });

    const profile = useProfile();
    const navigate = useNavigate();

    const [projectEdit, setProjectEdit] = useState();

    if(user.id !== userId)
        return <Navigate to='/' />;

    const onSubmit = (payload) => {
        let data = {}
        const blocks = JSON.stringify(projectEdit);

        if(payload.editProjectName !== project.name)
            data["name"] = payload.editProjectName;

        if(payload.editProjectShortDescription !== project.shortDescription)
            data["shortDescription"] = payload.editProjectShortDescription;

        if(payload.editProjectYear !== project.year)
            data["year"] = payload.editProjectYear;

        if(blocks && blocks !== project.blocks)
            data["blocks"] = blocks;

        if(payload.editProjectPreview !== project.preview)
        {
            if(payload.editProjectPreview)
            {
                dispatch(uploadProjectPreview(
                    {
                        userID: userId,
                        projectID: projectId,
                        file: payload.editProjectPreview[0]
                    }
                ));
                // dispatch(uploadAvatar({userID: userId, file: payload.editProfileAvatar[0]}));
            } else {
                data["preview"] = 'Plumb.png';
            }
        }

        if(payload.editProjectBanner !== project.image)
        {
            if(payload.editProjectBanner)
            {
                dispatch(uploadProjectImage({projectID: projectId, file: payload.editProjectBanner[0]}));
            } else {
                data["image"] = 'plumb.png';
            }
        }

        if(Object.entries(data).length !== 0) {
            data["projectID"] = projectId;

            dispatch(updateProject(data)).then(() => {
                navigate("/"+userId+"/project/"+projectId);
            });
        } else {
            navigate("/"+userId+"/project/"+projectId);
        }

        console.log("DATA", data)
    }

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

    const watchPreviewImage = watch("editProjectPreview", '');
    const watchBannerImage = watch("editProjectBanner", '');

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
            <ProjectUpperPart name={project.name}
                              banner={project.image}
                              shortDescription={project.shortDescription}
                              likes={profile.likesCount}
                              edit={false}
                              yourAccount={user.id === profile.id}
                              favouriteProjects={favouriteProjects}
            />
            <ProjectNavBar userID={profile.id}
                           edit={true}
                           save={handleSubmit(onSubmit)}
            />
            <EditProjectForm register={register}
                             errors={errors}
                             reset={reset}
                             project={project}
                             getValues={getValues}
                             watchPreviewImage={watchPreviewImage}
                             watchBannerImage={watchBannerImage}
                             setValue={setValue}
            />
            {
                  project.isLoading ?
                    <Loading/> :
                    <EditorJS setPortfolioEdit={setProjectEdit}
                              portfolio={project.blocks}
                    />
            }

            {/*<div className={s.floatButton}>*/}
            {/*    <Button click={handleSubmit}>Сохранить изменения</Button>*/}
            {/*</div>*/}


        </div>
    )
}
