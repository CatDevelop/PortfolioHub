import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import {Link} from "react-router-dom";
import s from "../components/NavBar/NavBar1.module.css";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";
import LandingWelcomePage from "../components/LandingWelcomePage/LandingWelcomePage";

export const WelcomePage = () => {
    const user = useAuth();
    console.log(user);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        debugger
        //dispatch(removeProfile());
        dispatch(removeUser());
        navigate("/");
    };

    return (
        <div>
            <LandingWelcomePage userID={user.id}

            />
            {!user.isAuth ? <>
                    <Link className={s.navbarLink} to="/registration">Зарегестрироваться</Link>
                    <Link className={s.navbarLink} to="/authorization">Авторизоваться</Link>
                </>: <></>
            }
            {user.isAuth ? <>
                <Link className={s.navbarLink} to={(user.id??"1")}>В портфолио</Link>
                <a className={s.navbarLink} onClick={logout}>Выйти</a>
                </> : <></>
            }

        </div>
    )
}
