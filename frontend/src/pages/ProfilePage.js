import React, {useEffect, useState} from "react";
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
import Loading from "../components/Loading/Loading";
import {ModalWindow} from "../components/ModalWindow/ModalWindow";
import {useForm} from "react-hook-form";
import ChangePasswordForm from "../components/ChangePasswordForm/ChangePasswordForm";

export const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            changePasswordOld: '',
            changePasswordNew: '',
            changePasswordNewRetry: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        // payload.authorizationPassword = md5(payload.authorizationPassword);
        // const data = {
        //     email: payload.authorizationEmail,
        //     password: payload.authorizationPassword
        // }
        // dispatch(signInUser(data));
    }

    const [changePasswordModalActive, setChangePasswordModalActive] = useState(false);

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
                              avatar={profile.avatarSource}
                              name={profile.name}
                              shortDescription={profile.shortDescription}
                              likes={profile.likesCount}
                              projects={profile.projectsCount}
            />
            <ProfileNavBar isProfile={true}
                           userID={user.id}
                           changePasswordModalActive={changePasswordModalActive}
                           setChangePasswordModalActive={setChangePasswordModalActive}
            />
            <ProfilePersonalInformation phone={profile.phone}
                                        email={profile.email}
                                        tags={profile.tags}
                                        cvSource={profile.cvSource}
            />

            <ModalWindow active={changePasswordModalActive}
                         setActive={setChangePasswordModalActive}
                         onClose={()=>reset()}>
                <ChangePasswordForm handleSubmit={handleSubmit}
                                    errors={errors}
                                    register={register}
                                    userID={userId}
                />
            </ModalWindow>
            {/*<ConsoleAndPhoto/>*/}
            {
                /*categories.map(c => {
                    return <ProjectsTable title={c.title} projects={projects.filter(p => p.categoryId === c.id)}/>
                })*/
            }
        </div>
    )
}
