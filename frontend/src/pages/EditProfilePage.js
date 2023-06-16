import React, {useEffect, useState} from "react";
import {getProfile, updateProfile, uploadAvatar, uploadBanner, uploadResume} from "../store/slices/profileSlice";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import {NotActivateAccount} from "./NotActivateAccount";
import {useProfile} from "../hooks/use-profile";
import {FillProfilePage} from "./FillProfilePage";
import {useForm} from "react-hook-form";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";
import Loading from "../components/Loading/Loading";
import Button from "../components/Button/Button";
import s from "./Pages.module.css"

export const EditProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        dispatch(getProfile(userId));
        debugger
    }, []);
    const profile = useProfile();
    const navigate = useNavigate();

    const [selectedTags, setSelectedTags] = useState();





    const [scroll, setScroll] = React.useState(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);






    const defaultValues = {
        editProfileName: profile.name,
        editProfileSurname: '',
        editProfileEmail: profile.email,
        editProfilePhone: '',
        editProfileShortDescription: '',
        editProfileResume: '',
        editProfileAvatar: '',
        editProfileBanner: '',
        editProfileLogo: '',
    }

    const {register, handleSubmit, setValue, reset, watch, getValues, formState: {errors}} = useForm({
        defaultValues: defaultValues,
        mode: "onBlur"
    });

    const [isVisibleEmail, setIsVisibleEmail] = useState(profile.isVisibleEmail);

    if(profile.isLoading && !profile.activate)
        return <Loading/>

    if(!profile.activate)
        return <NotActivateAccount/>

    if(user.id !== userId)
        return <Navigate to='/' />;

    if(!profile.isFilledProfile)
        return <FillProfilePage/>

    const onSubmit = (payload) => {
        console.log(payload)

        let data = {}

        if(isVisibleEmail !== profile.isVisibleEmail)
            data["isVisibleEmail"] = isVisibleEmail;

        if(payload.editProfileName !== profile.name)
            data["name"] = payload.editProfileName;

        if(payload.editProfileSurname !== profile.surname)
            data["surname"] = payload.editProfileSurname;

        if(payload.editProfilePhone !== profile.phone)
            data["phone"] = payload.editProfilePhone;

        if(JSON.stringify(profile.tags) !== JSON.stringify(selectedTags))
            data['tags'] = JSON.stringify(selectedTags)

        if(payload.editProfileShortDescription !== profile.shortDescription)
            data['shortDescription'] = payload.editProfileShortDescription;

        if(payload.editProfileResume !== profile.cvSource)
        {
            if(payload.editProfileResume)
            {
                dispatch(uploadResume({userID: userId, file: payload.editProfileResume[0]}));
            } else {
                data["resume"] = '';
            }
        }

        if(payload.editProfileAvatar !== profile.avatarSource)
        {
            if(payload.editProfileAvatar)
            {
                dispatch(uploadAvatar({userID: userId, file: payload.editProfileAvatar[0]}));
            } else {
                data["avatar"] = 'plumb.png';
            }
        }

        if(payload.editProfileBanner !== profile.bannerSource)
        {
            if(payload.editProfileBanner)
            {
                dispatch(uploadBanner({userID: userId, file: payload.editProfileBanner[0]}));
            } else {
                data["banner"] = '';
            }
        }

        if(Object.entries(data).length !== 0) {
            data["userID"] = userId;

            dispatch(updateProfile(data)).then(() => {
                navigate("/"+userId+"/profile");
            });
        } else {
            navigate("/"+userId+"/profile");
        }
    }

    const watchResumeFile = watch("editProfileResume", '');
    const watchAvatarImage = watch("editProfileAvatar", '');
    const watchBannerImage = watch("editProfileBanner", '');
    const watchLogoImage = watch("editProfileLogo", '');

    return (
        <div>
            <ProfileUpperPart surname={profile.surname}
                              name={profile.name}
                              avatar={profile.avatarSource}
                              shortDescription={profile.shortDescription}
                              likes={profile.likesCount}
                              projects={profile.projectsCount}
            />
            <ProfileNavBar isProfile={true} userID={user.id} edit={true} save={handleSubmit(onSubmit)}/>
            <EditProfileForm register={register}
                             errors={errors}
                             reset={reset}
                             profile={profile}
                             selectedTags={selectedTags}
                             setSelectedTags={setSelectedTags}
                             getValues={getValues}
                             watchResumeFile={watchResumeFile}
                             watchAvatarImage={watchAvatarImage}
                             watchBannerImage={watchBannerImage}
                             watchLogoImage={watchLogoImage}
                             setValue={setValue}
                             isVisibleEmail={isVisibleEmail}
                             setIsVisibleEmail={setIsVisibleEmail}
            />

            <div className={s.floatButton}>
                <Button click={handleSubmit(onSubmit)} isHide={scroll < 250}>Сохранить изменения</Button>
            </div>
        </div>
    )
}
