import React, {useEffect, useState} from 'react';
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import PageTitle from "../components/PageTitle/PageTitle";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import EditorJS from "../components/EditorJS/EditorJS";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import PortfolioNavBar from "../components/PortfolioNavBar/PortfolioNavBar";
import {useAuth} from "../hooks/use-auth";
import {getPortfolio, updatePortfolio} from "../store/slices/portfolioSlice";
import {usePortfolio} from "../hooks/use-portfolio";
import Loading from "../components/Loading/Loading";
import s from "./Pages.module.css";
import Button from "../components/Button/Button";

export const EditPortfolioPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();
    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getPortfolio(userId));
        debugger
    }, []);

    const profile = useProfile();
    const navigate = useNavigate();
    const portfolio = usePortfolio();

    const [portfolioEdit, setPortfolioEdit] = useState();


    const [scroll, setScroll] = React.useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);




    if(user.id !== userId)
        return <Navigate to='/' />;

    const handleSubmit = () => {
        if(!isLoading) {
            setIsLoading(true);
            const data = {
                userID: user.id,
                portfolio: JSON.stringify(portfolioEdit)
            }
            dispatch(updatePortfolio(data)).then(() => {
                setIsLoading(false)
                navigate("/" + user.id);
            });
        }
    }

    if(portfolio.isLoading || profile.isLoading)
        return <Loading/>

    return (
        <div>
            {/*<PageTitle title={"Редактирование портфолио"}/>*/}
            <PortfolioUpperPart name={profile.name}
                                surname={profile.surname}
                                avatar={profile.avatarSource}
                                banner={profile.bannerSource}
                                tags={profile.tags}
                                shortDescription={profile.shortDescription}
                                likes={profile.likesCount}
                                projects={profile.projectsCount}
                                edit={true}
                                yourAccount={user.id === profile.id}
                                handleSubmit={handleSubmit}
            />
            <PortfolioNavBar cvSource={profile.cvSource}
                             userID={profile.id}
                             edit={true}
            />
            {
                  portfolio.isLoading ?
                    <Loading/> :
                    <EditorJS setPortfolioEdit={setPortfolioEdit}
                              portfolio={portfolio.portfolio}
                    />
            }

            <div className={s.floatButton}>
                <Button click={handleSubmit} isHide={scroll < 250}>Сохранить изменения</Button>
            </div>


        </div>
    )
}
