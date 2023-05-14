import React, { useEffect } from 'react';
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import s from "../components/NavBar/NavBar1.module.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import {activateUser} from "../store/slices/userSlice";

export const ActivatePage = () => {
    const { link } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activateAccount = () => {
        dispatch(activateUser({link: link})).then(
            response => navigate("/"+response.payload.data.userID+"/profile")
        )
    }

    useEffect(() => {
        activateAccount()
    }, []);

    // const profile = useProfile();
    return (
        <div>
            Активирую аккаунт...
            {/*<ConsoleAndPhoto toRotate={profile.positions}/>*/}
            {/*{*/}
            {/*    profile.informationBlocks.map(block =>{*/}
            {/*        return block.blockType === "Text" ?*/}
            {/*            <InfoBlock header={block.blockTitle} content={block.content}/> : <></>*/}
            {/*    })*/}
            {/*}*/}
            {/*<InfoBlock header={"Bio"}*/}
            {/*           content={"Sed pharetra convallis rutrum. Aliquam tincidunt dolor neque, id tempor ligula sollicitudin et. Mauris pretium id lectus eu laoreet. Phasellus sit amet tortor tempor, laoreet lectus vitae, suscipit ipsum. Pellentesque ut blandit lectus. Praesent venenatis risus in ultrices sagittis. Curabitur condimentum fringilla ipsum non condimentum. Integer molestie erat turpis, sed condimentum odio tincidunt sit amet. Suspendisse fermentum mauris vitae mattis dictum. Maecenas ut hendrerit ex, fermentum mollis nisi. Aenean nec interdum turpis. In accumsan vitae purus quis laoreet. Praesent felis odio, efficitur eget lobortis non, gravida eu justo. Mauris non volutpat nibh. Duis quis mauris id purus pulvinar aliquam. In et ornare ipsum, non porttitor sapien."}/>*/}
            {/*<InfoBlock header={"I ♥"} content={"Phasellus aliquam lorem tellus. Etiam finibus est in arcu varius, in placerat risus vehicula."}/>*/}
            {/*<InfoBlock header={"On the web"} content={"TEWSTSTSTSTSTST"}/>*/}
        </div>
    )
}
