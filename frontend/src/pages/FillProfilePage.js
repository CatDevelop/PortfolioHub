import React, {useEffect, useState} from "react";
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";

import testImage from "../assets/img/project-img1.png";

import projectImage0 from "../assets/img/CDlogoAutoMagShina.png";
import projectImage1 from "../assets/img/CDlogoUralMebel.png";
import projectImage2 from "../assets/img/project-img2.png";
import projectImage11 from "../assets/img/project-img11.png";
import projectImage15 from "../assets/img/CDlogoHeroReturn.png";
import {getProfile, updateProfile, uploadResume} from "../store/slices/profileSlice";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import ProfilePersonalInformation from "../components/ProfilePersonalInformation/ProfilePersonalInformation";
import {NotActivateAccount} from "./NotActivateAccount";
import {NotFilledAccount} from "./NotFilledAccount";
import {useProfile} from "../hooks/use-profile";
import {useForm} from "react-hook-form";
import FillProfileForm from "../components/FillProfileForm/FillProfileForm";
import { v4 as uuidv4 } from 'uuid';
import NavigateButton from "../components/NavigateButton/NavigateButton";
import Button from "../components/Button/Button";


export const FillProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        dispatch(getProfile(userId));
        debugger
    }, []);
    const profile = useProfile();
    const navigate = useNavigate();

    const {register, handleSubmit, watch, setValue, getValues, formState: {errors}} = useForm({
        defaultValues: {
            fillProfileName: '',
            fillProfileSurname: '',
            fillProfileEmail: profile.email,
            fillProfilePhone: '',
            fillProfileShortDescription: '',
            fillProfileResume: ''
        },
        mode: "onBlur"
    });

    const [selectedTags, setSelectedTags] = useState();

    if(user.id !== userId)
        return <Navigate to='/' />;

    if(profile.activate == 0)
        return <NotActivateAccount/>

    const onSubmit = (payload) => {
        console.log(payload)

        let data = {
            userID: userId,
            name: payload.fillProfileName,
            surname: payload.fillProfileSurname,
            email: payload.fillProfileEmail,
            phone: payload.fillProfilePhone
        }

        if(selectedTags)
            data['tags'] = JSON.stringify(selectedTags)
        else
            data['tags'] = "[]"

        if(payload.fillProfileShortDescription)
            data['shortDescription'] = payload.fillProfileShortDescription;
        else
            data['shortDescription'] = ''

        if(payload.fillProfileResume) {
            dispatch(uploadResume({userID: userId, file: payload.fillProfileResume[0]}));
            dispatch(updateProfile(data)).then(() => {
                navigate("/"+userId+"/profile");
            });
        } else
            data['resume'] = '';
            dispatch(updateProfile(data)).then(() => {
                navigate("/"+userId+"/profile");
            });

        // console.log({...payload, fillProfileTags: selectedTags});
    }

    const watchResumeFile = watch("fillProfileResume", '');

    // useEffect(() => {
    //     dispatch(getProfile(projectId));
    //
    // }, []);
    debugger
    return (
        <div>
            {/*<PortfolioUpperPart/>*/}
            {/*<PortfolioNavBar edit={true} save={handleSubmit(onSubmit)}/>*/}
            <FillProfileForm register={register}
                             errors={errors}
                             selectedTags={selectedTags}
                             setSelectedTags={setSelectedTags}
                             getValues={getValues}
                             watchResumeFile={watchResumeFile}
                             setValue={setValue}
            />
            <Button click={handleSubmit(onSubmit)}>
                Сохранить
            </Button>
        </div>
    )
}
