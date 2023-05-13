import React from 'react';
import s from './Breadcrumbs.module.css';
import {Link} from "react-router-dom";

function Breadcrumbs(props) {
    return (
        <div className={s.breadcrumbs}>
            {
                props.breadcrumbs.map(crumb => {
                    if(crumb.src) {
                        return <>
                            <Link className={s.breadcrumbsLink} to={crumb.src}>{crumb.title}</Link>
                            {/*<div className={s.icon}>*/}
                                <svg viewBox="0 0 24 24" focusable="false" className={s.breadcrumbsIcon}>
                                    <path fill="white" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                </svg>
                            {/*</div>*/}
                        </>
                    } else {
                        return <><h3>{crumb.title} {crumb.year?<span className={s.year}>{crumb.year}</span>:<></>}</h3></>
                    }
                })
            }
        </div>
    )
}

export default Breadcrumbs;
