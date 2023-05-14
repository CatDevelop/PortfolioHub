import React, { useEffect } from 'react';
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "../components/NavBar/NavBar1.module.css";
import {Link, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import PortfolioNavBar from "../components/PortfolioNavBar/PortfolioNavBar";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {useAuth} from "../hooks/use-auth";
import {NotFoundPage} from "./NotFoundPage";
import {NotFilledAccount} from "./NotFilledAccount";
import {NotActivateAccount} from "./NotActivateAccount";
import {getPortfolio} from "../store/slices/portfolioSlice";
import {usePortfolio} from "../hooks/use-portfolio";
import Loading from "../components/Loading/Loading";
import Portfolio from "../components/Portfolio/Portfolio";

export const PortfolioPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getPortfolio(userId));
        debugger
    }, []);

    const user = useAuth();

    const profile = useProfile();
    const portfolio = usePortfolio();
    console.log(portfolio);

    if(!profile.activate && user.id===profile.id)
        return <NotActivateAccount userID={user.id}/>

    if (portfolio.isLoading)
        return <Loading/>

    if(!profile.name && user.id===profile.id)
        return <NotFilledAccount userID={user.id}/>

    if(!profile.id || !profile.name)
        return <NotFoundPage/>

    return (
        <div>
            <PortfolioUpperPart name={profile.name}
                                surname={profile.surname}
                                avatar={profile.avatarSource}
                                banner={profile.bannerSource}
                                tags={profile.tags}
                                shortDescription={profile.shortDescription}
                                likes={profile.likesCount}
                                projects={profile.projectsCount}
                                edit={false}
                                yourAccount={user.id === profile.id}
            />
            <PortfolioNavBar cvSource={profile.cvSource}
                             userID={profile.id}
                             edit={false}
            />
            <Portfolio portfolio={portfolio.portfolio}/>
            {/*<Portfolio portfolio={portfolio}/>*/}
        </div>
    )
}
