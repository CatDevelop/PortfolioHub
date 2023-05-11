import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "../components/NavBar/NavBar1.module.css";
import {Link} from "react-router-dom";
import Input from "../components/Input/Input";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

export const RegistrationPage = () => {
    return (
        <div>
            <div>
                <RegistrationForm/>
            </div>
        </div>
    )
}