import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "./Pages.module.css";
import {Link} from "react-router-dom";
import Input from "../components/Input/Input";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import NavigateButton from "../components/NavigateButton/NavigateButton";

export const NotFoundPage = () => {
    return (
        <div>
            <div className={s.errorPage}>
                <div className={s.errorPageTB}>
                    <h1>Страница не найдена :(</h1>
                    <p>Кажется, эта страница отсутствует.<br/>
                        Пожалуйста, проверьте URL-адрес или вернитесь назад.</p>
                    <NavigateButton link="/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Главная
                    </NavigateButton>
                </div>
            </div>
        </div>
    )
}
