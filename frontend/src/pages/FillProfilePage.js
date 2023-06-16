import React, {useEffect, useState} from "react";
import {getProfile, updateProfile, uploadResume} from "../store/slices/profileSlice";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {NotActivateAccount} from "./NotActivateAccount";
import {useProfile} from "../hooks/use-profile";
import {useForm} from "react-hook-form";
import FillProfileForm from "../components/FillProfileForm/FillProfileForm";
import Button from "../components/Button/Button";
import Loading from "../components/Loading/Loading";


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
    }

    const watchResumeFile = watch("fillProfileResume", '');

    if(profile.isLoading)
        return <Loading/>

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
