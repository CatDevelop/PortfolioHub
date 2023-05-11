import React from 'react';
import s from './LandingWelcomePage.module.css';
import NavigateButton from "../NavigateButton/NavigateButton";
import welcomePage from "../../assets/img/WelcomePage.png"
import welcomePage2 from "../../assets/img/WelcomePage2.png"
import {Link} from "react-router-dom";

function LandingWelcomePage(props) {
    return (
        <>
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
                    <Link className={s.regButton} to={props.userID? "/" + props.userID+"/":"/registration"}>Создать портфолио</Link>
                    <img src={welcomePage2} alt=""/>
                </div>
            </div>
        </>

    )
}

export default LandingWelcomePage;
