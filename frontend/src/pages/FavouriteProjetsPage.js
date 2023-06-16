import React, {useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import {useDispatch} from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import {useAuth} from "../hooks/use-auth";
import Loading from "../components/Loading/Loading";
import {NotActivateAccount} from "./NotActivateAccount";
import {NotFilledAccount} from "./NotFilledAccount";
import FavouriteProjects from "../components/FavouriteProjects/FavouriteProjects";
import {useFavouriteProjects} from "../hooks/use-favourite-projects";
import {getFavouriteProjects} from "../store/slices/favouriteProjectsSlice";

export const FavouriteProjectsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    const profile = useProfile();
    const favouriteProjects = useFavouriteProjects();

    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getFavouriteProjects(userId));
    }, []);

    if(profile.isLoading && !profile.activate)
        return <Loading/>

    if(!profile.activate)
        return <NotActivateAccount/>

    if(user.id !== userId)
        return <Navigate to='/' />;

    if(!profile.isFilledProfile)
        return <NotFilledAccount userID={userId}/>


    const projects = [
        {
            "id":"1",
            "name":"АвтоМагШина",
            "shortDescription":"Online store of tires and wheels with selection by car model",
            "previewSource":"images\/previews\/1.png"
        },
        {
            "id":"2",
            "name":"УралМебель",
            "shortDescription":"Online store of upholstered furniture in a modern style",
            "previewSource":"images\/previews\/1.png"
        },
    ]

    if(profile.isLoading || favouriteProjects.isLoading)
        return <Loading/>

    return (
        <div>
            <ProfileUpperPart surname={profile.surname}
                              avatar={profile.avatarSource}
                              name={profile.name}
                              shortDescription={profile.shortDescription}
                              likes={profile.likesCount}
                              projects={profile.projectsCount}
            />
            <ProfileNavBar isProfile={false} userID={user.id}/>

            <FavouriteProjects projects={favouriteProjects.projects}/>

        </div>
    )
}
