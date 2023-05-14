import React, {useRef} from 'react';
import s from './PortfolioUpperPart.module.css';
import Avatar from '../../assets/img/Av1.png'
import PortfolioBanner from '../../assets/img/PortBa.png'
import PortfolioBanner2 from '../../assets/img/PortfolioBanner2.png'

import LikeIcon from '../../assets/img/LikeIcon.svg'
import ProjectsIcon from '../../assets/img/ProjectsIcon.svg'
import Tags from "../Tags/Tags";
import {useDetectOutsideClick} from "../ProfileNavBar/useDetectOutsideClick";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

function PortfolioUpperPart(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => {
        setIsActive(!isActive);
        console.log(isActive)
    };


    return (
        <div className={s.container}>

            <div className={s.upContainer}>
                {/*<img src="https://images.unsplash.com/photo-1682250705830-11c1cecbd3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt=""/>*/}
                <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/portfolioImages/"+props.banner} alt=""/>
            </div>

            <div className={s.downContainer}>
                <div>
                    <img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/avatars/"+props.avatar} alt="" className={s.avatar}/>
                </div>
                <div className={s.rightContainer}>
                    <div className={s.rightUpContainer}>
                        <div className={s.nameAndDescription}>
                            <p className={s.name}>{props.surname} {props.name}</p>
                            <p className={s.description}>{props.shortDescription}</p>
                        </div>

                        <div className={s.likesAndProjects}>
                            <div className={s.likes}>
                                <img className={s.likeIcon} src={LikeIcon} alt={'like'}/>
                                <p className={s.likesCount}>{props.likes}</p>
                            </div>

                            <div className={s.projects}>
                                <img className={s.projectsIcon} src={ProjectsIcon} alt={'like'}/>
                                <p className={s.projectsCount}>{props.projects}</p>
                            </div>

                            {
                                props.yourAccount ?
                                    <div className="menu-container">
                                        <nav ref={dropdownRef}
                                             className={`menu menu2 ${isActive ? "active" : "inactive"} ${props.editProjects ? "menu3" : ""}` }>
                                            {props.edit ?
                                                props.editProjects ?
                                                    <ul>
                                                        <li>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 13H15M12 10V16M3 17V7C3 5.89543 3.89543 5 5 5H11L13 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>


                                                            <a onClick={props.addCategory}>Создать раздел</a>
                                                        </li>

                                                        <li>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0016 3.6001C12.6643 3.6001 13.2016 4.13736 13.2016 4.8001V10.8001H19.2016C19.8643 10.8001 20.4016 11.3374 20.4016 12.0001C20.4016 12.6628 19.8643 13.2001 19.2016 13.2001H13.2016V19.2001C13.2016 19.8628 12.6643 20.4001 12.0016 20.4001C11.3388 20.4001 10.8016 19.8628 10.8016 19.2001V13.2001H4.80156C4.13882 13.2001 3.60156 12.6628 3.60156 12.0001C3.60156 11.3374 4.13882 10.8001 4.80156 10.8001L10.8016 10.8001V4.8001C10.8016 4.13736 11.3388 3.6001 12.0016 3.6001Z" fill="white"/>
                                                            </svg>

                                                            <a onClick={props.addProject}>Создать проект</a>
                                                        </li>
                                                    </ul> :
                                                    <ul>
                                                        <li>
                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M15.2322 5.2459L18.7677 8.78144M16.7322 3.7459C17.7085 2.76959 19.2914 2.76959 20.2677 3.7459C21.244 4.72222 21.244 6.30513 20.2677 7.28144L6.5 21.0492H3V17.4781L16.7322 3.7459Z"
                                                                    stroke="white" stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"/>
                                                            </svg>
                                                            <Link onClick={props.handleSubmit}>Сохранить
                                                                изменения</Link>
                                                        </li>
                                                    </ul> :
                                                <ul>
                                                    <li>
                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M15.2322 5.2459L18.7677 8.78144M16.7322 3.7459C17.7085 2.76959 19.2914 2.76959 20.2677 3.7459C21.244 4.72222 21.244 6.30513 20.2677 7.28144L6.5 21.0492H3V17.4781L16.7322 3.7459Z"
                                                                stroke="white" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"/>
                                                        </svg>
                                                        <Link to='./edit'>Редактировать</Link>
                                                    </li>
                                                </ul>}
                                        </nav>

                                        <button onClick={onClick} className="menu-trigger">
                                            <svg width="32" height="32" viewBox="0 0 48 48" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 24H10.02M24 24H24.02M38 24H38.02M12 24C12 25.1046 11.1046 26 10 26C8.89543 26 8 25.1046 8 24C8 22.8954 8.89543 22 10 22C11.1046 22 12 22.8954 12 24ZM26 24C26 25.1046 25.1046 26 24 26C22.8954 26 22 25.1046 22 24C22 22.8954 22.8954 22 24 22C25.1046 22 26 22.8954 26 24ZM40 24C40 25.1046 39.1046 26 38 26C36.8954 26 36 25.1046 36 24C36 22.8954 36.8954 22 38 22C39.1046 22 40 22.8954 40 24Z"
                                                    stroke="white" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    </div> : <></>
                            }


                        </div>
                    </div>
                    <div>
                        <Tags tags={props.tags}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioUpperPart;
