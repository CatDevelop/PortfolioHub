import React, {useEffect} from "react";
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";

import testImage from "../assets/img/project-img1.png";
import s from "./Pages.module.css";
import projectImage0 from "../assets/img/CDlogoAutoMagShina.png";
import projectImage1 from "../assets/img/CDlogoUralMebel.png";
import projectImage2 from "../assets/img/project-img2.png";
import projectImage11 from "../assets/img/project-img11.png";
import projectImage15 from "../assets/img/CDlogoHeroReturn.png";
import {getProfile} from "../store/slices/profileSlice";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import ProfilePersonalInformation from "../components/ProfilePersonalInformation/ProfilePersonalInformation";
import {NotActivateAccount} from "./NotActivateAccount";
import {NotFilledAccount} from "./NotFilledAccount";
import {useProfile} from "../hooks/use-profile";
import {retry} from "@reduxjs/toolkit/query";
import ReactLoading from 'react-loading';
import Loading from "../components/Loading/Loading";

export const ProfilePage = () => {
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

    debugger
    return (
        <div>
            <ProfileUpperPart surname={profile.surname}
                              name={profile.name}
                              shortDescription={profile.shortDescription}
                              likes={49}
                              projects={58}
            />
            <ProfileNavBar isProfile={true} userID={user.id}/>
            <ProfilePersonalInformation phone={profile.phone}
                                        email={profile.email}
                                        tags={profile.tags}
                                        cvSource={profile.cvSource}
            />
            {/*<ConsoleAndPhoto/>*/}
            {
                /*categories.map(c => {
                    return <ProjectsTable title={c.title} projects={projects.filter(p => p.categoryId === c.id)}/>
                })*/
            }
        </div>
    )
}
