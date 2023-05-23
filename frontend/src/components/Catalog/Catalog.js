import React from 'react';
import s from './Catalog.module.css';
import {Link} from "react-router-dom";
import {CatalogUserCard} from "../CatalogUserCard/CatalogUserCard";

function Catalog(props) {
    const users = [...props.users];

    users.sort((a, b) => {
        if(a.likesCount > b.likesCount)
            return -1;
        if(a.likesCount === b.likesCount) {
            if (a.projectsCount > b.projectsCount)
                return -1;
            if (a.projectsCount === b.projectsCount)
                return 0;
            return 1;
        }
        return 1;
    })

    return (
        <div className={s.catalog}>
            {
                users.map(user => {

                    return user.name? <CatalogUserCard name={user.name}
                                            surname={user.surname}
                                            shortDescription={user.shortDescription}
                                            userID={user.id}
                                            mail={user.email}
                                            avatar={user.avatarSource}
                                            likes={user.likesCount}
                                            projects={user.projectsCount}
                                            tags={user.tags?JSON.parse(user.tags):[]}
                    />:<></>
                })
            }
        </div>
    )
}

export default Catalog;
