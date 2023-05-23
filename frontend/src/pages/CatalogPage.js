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
import {CatalogUserCard} from "../components/CatalogUserCard/CatalogUserCard";
import {useUsers} from "../hooks/use-users";
import {getUsers} from "../store/slices/usersSlice";
import Catalog from "../components/Catalog/Catalog";
import PageTitle from "../components/PageTitle/PageTitle";

export const CatalogPage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const user = useAuth();

    const onSubmit = (payload) => {
        // payload.authorizationPassword = md5(payload.authorizationPassword);
        // const data = {
        //     email: payload.authorizationEmail,
        //     password: payload.authorizationPassword
        // }
        // dispatch(signInUser(data));
    }


    const profile = useProfile();
    let users = useUsers();
    console.log(users)

    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getUsers());
    }, []);

    if (users.isLoading)
        return <Loading/>

    return (
        <div>
            <PageTitle title={"Каталог пользователей"}/>
            <Catalog users={users.users}/>

        </div>
    )
}
