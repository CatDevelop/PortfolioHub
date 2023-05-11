import React, { useEffect } from 'react';
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "../components/NavBar/NavBar1.module.css";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import {activateUser} from "../store/slices/userSlice";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import PortfolioNavBar from "../components/PortfolioNavBar/PortfolioNavBar";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import {useAuth} from "../hooks/use-auth";
import Loading from "../components/Loading/Loading";
import {NotActivateAccount} from "./NotActivateAccount";
import {NotFilledAccount} from "./NotFilledAccount";
import FavouriteProjects from "../components/FavouriteProjects/FavouriteProjects";

export const FavouriteProjectsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    const profile = useProfile();
    console.log(profile)

    useEffect(() => {
        dispatch(getProfile(userId));
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
    return (
        <div>
            <ProfileUpperPart surname={profile.surname}
                              name={profile.name}
                              shortDescription={profile.shortDescription}
                              likes={49}
                              projects={58}
            />
            <ProfileNavBar isProfile={false} userID={user.id}/>

            <FavouriteProjects projects={projects}/>

        </div>
    )
}
