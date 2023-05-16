import React, {useRef} from 'react';
import s from './ProjectUpperPart.module.css';
import Avatar from '../../assets/img/Av1.png'
import PortfolioBanner from '../../assets/img/PortBa.png'
import PortfolioBanner2 from '../../assets/img/PortfolioBanner2.png'
import ProjectImage from '../../assets/img/ProjectUpperPart.png'

import LikeIcon from '../../assets/img/LikeIcon.svg'
import ProjectsIcon from '../../assets/img/ProjectsIcon.svg'
import Tags from "../Tags/Tags";
import {useDetectOutsideClick} from "../ProfileNavBar/useDetectOutsideClick";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

function ProjectUpperPart(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => {
        setIsActive(!isActive);
        console.log(isActive)
    };


    return (
        <div className={s.container}>

            <div className={s.upContainer}>
                {/*<img src={"https://www.ren-design.ru/api/portfolio-hub/1.0/files/projectImages/"+props.banner} alt=""/>*/}
                <div className={s.projectImage}
                     style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url('https://www.ren-design.ru/api/portfolio-hub/1.0/files/projectImages/" + props.banner + "')"}}/>
                <div className={s.projectInfo}>
                    <div>
                        <p className={s.projectName}>{props.name}</p>
                        <p className={s.projectDescription}>{props.shortDescription}</p>
                    </div>

                    <div className={s.likes}>
                        <img className={s.likeIcon} src={LikeIcon} alt={'like'}/>
                        <p className={s.likesCount}>{props.likes}</p>
                    </div>

                </div>
            </div>

            {/*<div className={s.downContainer}>*/}
            {/*    <div>*/}
            {/*        <img src={Avatar} alt="" className={s.avatar}/>*/}
            {/*    </div>*/}
            {/*    <div className={s.rightContainer}>*/}
            {/*        <div className={s.rightUpContainer}>*/}
            {/*            <div className={s.nameAndDescription}>*/}
            {/*                <p className={s.name}>{props.surname} {props.name}</p>*/}
            {/*                <p className={s.description}>{props.shortDescription}</p>*/}
            {/*            </div>*/}

            {/*            <div className={s.likesAndProjects}>*/}
            {/*                <div className={s.likes}>*/}
            {/*                    <img className={s.likeIcon} src={LikeIcon} alt={'like'}/>*/}
            {/*                    <p className={s.likesCount}>{props.likes}</p>*/}
            {/*                </div>*/}

            {/*                <div className={s.projects}>*/}
            {/*                    <img className={s.projectsIcon} src={ProjectsIcon} alt={'like'}/>*/}
            {/*                    <p className={s.projectsCount}>{props.projects}</p>*/}
            {/*                </div>*/}

            {/*                {*/}
            {/*                    props.yourAccount ? <div className="menu-container">*/}
            {/*                        <nav ref={dropdownRef}*/}
            {/*                             className={`menu menu2 ${isActive ? "active" : "inactive"}`}*/}
            {/*                        >*/}
            {/*                            {props.edit ?*/}
            {/*                                <ul>*/}
            {/*                                    <li>*/}
            {/*                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"*/}
            {/*                                             xmlns="http://www.w3.org/2000/svg">*/}
            {/*                                            <path*/}
            {/*                                                d="M15.2322 5.2459L18.7677 8.78144M16.7322 3.7459C17.7085 2.76959 19.2914 2.76959 20.2677 3.7459C21.244 4.72222 21.244 6.30513 20.2677 7.28144L6.5 21.0492H3V17.4781L16.7322 3.7459Z"*/}
            {/*                                                stroke="white" stroke-width="2" stroke-linecap="round"*/}
            {/*                                                stroke-linejoin="round"/>*/}
            {/*                                        </svg>*/}
            {/*                                        <Link onClick={props.handleSubmit}>Сохранить изменения</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul> :*/}
            {/*                                <ul>*/}
            {/*                                    <li>*/}
            {/*                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"*/}
            {/*                                             xmlns="http://www.w3.org/2000/svg">*/}
            {/*                                            <path*/}
            {/*                                                d="M15.2322 5.2459L18.7677 8.78144M16.7322 3.7459C17.7085 2.76959 19.2914 2.76959 20.2677 3.7459C21.244 4.72222 21.244 6.30513 20.2677 7.28144L6.5 21.0492H3V17.4781L16.7322 3.7459Z"*/}
            {/*                                                stroke="white" stroke-width="2" stroke-linecap="round"*/}
            {/*                                                stroke-linejoin="round"/>*/}
            {/*                                        </svg>*/}
            {/*                                        <Link to='./edit'>Редактировать</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>}*/}
            {/*                        </nav>*/}

            {/*                        <button onClick={onClick} className="menu-trigger">*/}
            {/*                            <svg width="32" height="32" viewBox="0 0 48 48" fill="none"*/}
            {/*                                 xmlns="http://www.w3.org/2000/svg">*/}
            {/*                                <path*/}
            {/*                                    d="M10 24H10.02M24 24H24.02M38 24H38.02M12 24C12 25.1046 11.1046 26 10 26C8.89543 26 8 25.1046 8 24C8 22.8954 8.89543 22 10 22C11.1046 22 12 22.8954 12 24ZM26 24C26 25.1046 25.1046 26 24 26C22.8954 26 22 25.1046 22 24C22 22.8954 22.8954 22 24 22C25.1046 22 26 22.8954 26 24ZM40 24C40 25.1046 39.1046 26 38 26C36.8954 26 36 25.1046 36 24C36 22.8954 36.8954 22 38 22C39.1046 22 40 22.8954 40 24Z"*/}
            {/*                                    stroke="white" stroke-width="2" stroke-linecap="round"*/}
            {/*                                    stroke-linejoin="round"/>*/}
            {/*                            </svg>*/}
            {/*                        </button>*/}
            {/*                    </div> : <></>*/}
            {/*                }*/}


            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <Tags tags={props.tags}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default ProjectUpperPart;
