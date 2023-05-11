import {useState, useEffect} from "react";
import logo from '../../assets/img/logo.svg';
import s from "./NavBar1.module.css";
import {Link} from "react-router-dom";
import Logo from "../../assets/img/Catik2.svg"
import Logo1 from "../../assets/img/LogoPortfolio.svg"
import {useAuth} from "../../hooks/use-auth";
import {useProfile} from "../../hooks/use-profile";


function NavBar(props) {
    const user = useAuth();
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const profile = useProfile();

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    // return (
    //     <nav className={scrolled ? "scrolled" : ""}>
    //         <Link to="/">
    //             <img src={logo} alt="Log"/>
    //         </Link>
    //     </nav>
    // )

    return (


        <header className={s.navbar}>
            <nav className={s.navbarContainer}>
                <Link className={s.homeLink} to="/">
                    <div className={s.navbarLogo}><img src={Logo1} alt={"logo"}/></div>
                </Link>
                <button type="button" className={s.navbarToggle} id="navbar-toggle" aria-controls="navbar-menu"
                        aria-label="Toggle menu"
                        aria-expanded="false">
                    <span className={s.iconBar}></span>
                    <span className={s.iconBar}></span>
                    <span className={s.iconBar}></span>
                </button>

                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className={s.navbarLinks}>

                        {
                            props.type === "main" ?
                                user.isAuth ?
                                    <>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to="/">
                                                Главная
                                            </Link>
                                        </li>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to={"/" + user.id}>
                                                Портфолио
                                            </Link>
                                        </li>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to="/catalog">
                                                Каталог пользователей
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to="/">
                                                Главная
                                            </Link>
                                        </li>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to="registration">
                                                Создать портфолио
                                            </Link>
                                        </li>
                                        <li className={s.navbarItem}>
                                            <Link className={s.navbarLink} to="/catalog">
                                                Каталог пользователей
                                            </Link>
                                        </li>
                                    </>
                                :
                                <>
                                    <li className={s.navbarItem}>
                                        <Link className={s.navbarLink} to={"/" + profile.id}>
                                            Портфолио
                                        </Link>
                                    </li>
                                    <li className={s.navbarItem}>
                                        <Link className={s.navbarLink} to={"/" + profile.id + "/projects"}>
                                            Проекты
                                        </Link>
                                    </li>
                                </>

                        }
                    </ul>
                </div>


                <div id="navbar-menu" aria-labelledby="navbar-toggle" className={s.navbarLastContainer}>
                    <ul className={s.navbarLinks}>
                        {
                            user.isAuth ?
                                <>
                                    <li className={s.navbarItem}>
                                        <Link className={s.navbarLink} to={"/" + user.id + "/profile"}>
                                            Личный кабинет
                                        </Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className={s.navbarItem}>
                                        <Link className={s.navbarLink} to="/authorization">
                                            Войти
                                        </Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>










                {/*<div id="navbar-menu" aria-labelledby="navbar-toggle">*/}
                {/*    <ul className={s.navbarLinks}>*/}
                {/*        /!*<ul>*!/*/}
                {/*        {*/}
                {/*            props.type === "port" ? <>*/}
                {/*                <li className={s.navbarItem}><Link className={s.navbarLink}*/}
                {/*                                                   to={"/"+user.id}>Моё портфолио</Link></li>*/}
                {/*                <li className={s.navbarItem}><Link className={s.navbarLink}*/}
                {/*                                                   to={user.id+"/projects/"}>Мои проекты</Link></li>*/}
                {/*            </> : <></>*/}
                {/*        }*/}

                {/*        /!*<li className={s.navbarItem}><Link className={s.navbarLink} to="/blog">Blog</Link></li>*!/*/}

                {/*    </ul>*/}
                {/*</div>*/}
                {/*{*/}
                {/*    !user.isAuth ? <div id="navbar-menu" aria-labelledby="navbar-toggle">*/}
                {/*            <ul className={s.navbarLinks}>*/}
                {/*                {*/}
                {/*                    props.type !== "port" ? <>*/}
                {/*                        <li className={s.navbarItem}><Link className={s.navbarLink}*/}
                {/*                                                           to="/registration">Create</Link></li>*/}
                {/*                    </> : <></>*/}
                {/*                }*/}
                {/*                <li className={s.navbarItem}><Link className={s.navbarLink} to="/authorization">Login</Link>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div> :*/}
                {/*        <div id="navbar-menu" aria-labelledby="navbar-toggle">*/}
                {/*            <ul className={s.navbarLinks}>*/}
                {/*                <li className={s.navbarItem}><Link className={s.navbarLink} to={user.id+"/profile/"}>Личный кабинет</Link></li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*}*/}

            </nav>
        </header>)
}

export default NavBar;
