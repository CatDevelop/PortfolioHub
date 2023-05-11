import React from 'react';
import s from './ProfilePersonalInformation.module.css';
import Avatar from '../../assets/img/Av1.png'
import ProjectInformationRow from "../ProjectInformationRow/ProjectInformationRow";
import ProfileInformationRow from "../ProfileInformationRow/ProfileInformationRow";
import Tags from "../Tags/Tags";
import DownloadFileButton from "../DownloadFileButton/DownloadFileButton";
import Loading from "../Loading/Loading";

function ProfilePersonalInformation(props) {
    const tags = [
        {
            id: 1,
            type: "level",
            text: "Senior"
        },
        {
            id: 2,
            type: "language",
            text: "Python"
        }
    ]

    return (
        <div className={s.container}>
            {/*<div className={s.leftContainer}>*/}
            <div className={s.information}>
                <p className={s.title}>Личная информация</p>
                <div className={s.informationRows}>
                    <ProfileInformationRow title={"Эл. почта"} information={props.email}/>
                    <ProfileInformationRow title={"Моб. телефон"} information={props.phone}/>
                </div>
            </div>

            {/*<div className={s.social}>*/}
            {/*    <p className={s.title}>Социальные сети</p>*/}
            {/*    <Tags tags={props.tags}/>*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*<div className={s.rightContainer}>*/}

            {
                props.tags.length ? <div className={s.tags}>
                    <p className={s.title}>Теги</p>
                    <Tags tags={props.tags}/>
                </div> : <></>
            }

            {
                props.cvSource ?
                    <div className={s.resume}>
                        <p className={s.title}>Резюме</p>
                        <DownloadFileButton link={props.cvSource} text={"Resume.docx"}/>
                    </div> : <></>
            }

            {/*</div>*/}
        </div>
    )
}

export default ProfilePersonalInformation;
