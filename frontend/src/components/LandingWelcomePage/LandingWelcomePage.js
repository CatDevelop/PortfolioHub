import React, {useEffect} from 'react';
import s from './LandingWelcomePage.module.css';
import welcomePage2 from "../../assets/img/WelcomePage2.png"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useUsers} from "../../hooks/use-users";
import {getUsers} from "../../store/slices/usersSlice";
import Loading from "../Loading/Loading";
import {UserCard} from "../UserCard/UserCard";

function LandingWelcomePage(props) {
    const dispatch = useDispatch()
    const users = useUsers();
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    if (users.isLoading) return <Loading/>

    return (<>
            {/*<img className={s.firstSectionImage} src={welcomePage} alt=""/>*/}
            {/*<figure className={s.ball}/>*/}
            <div className={s.landingPage}>
                <div className={s.firstSection}>
                    <div>
                        <h1>Portfolio Hub</h1>
                        <p>
                            Создай эффективно и продающее портфолио вместе с Portfolio Hub.<br/>
                            Мы объединяем множество портфолио в одном сервисе.
                        </p>
                    </div>
                    <Link className={s.regButton} to={props.userID ? "/" + props.userID + "/" : "/registration"}>Создать
                        портфолио</Link>
                    <img src={welcomePage2} alt=""/>
                </div>

                {/*<div className={s.secondSection}>*/}
                {/*    <h1>Каталог пользователей</h1>*/}
                {/*    <div className={s.carousel}>*/}
                {/*        {users.users.slice().filter(user => user.name).sort((u1, u2) => u1.likesCount - u2.likesCount).slice(0, 10).map(user => {*/}
                {/*            return <UserCard title={user.surname + " " + user.name}*/}
                {/*                             userID={user.id}*/}
                {/*                             description={user.shortDescription}*/}
                {/*                             imgUrl={user.avatarSource}*/}
                {/*                             likesCount={user.likesCount}*/}
                {/*            />*/}
                {/*        })}*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </>

    )
}

export default LandingWelcomePage;
