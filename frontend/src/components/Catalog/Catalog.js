import React from 'react';
import s from './Catalog.module.css';
import {Link} from "react-router-dom";
import {CatalogUserCard} from "../CatalogUserCard/CatalogUserCard";

function Catalog(props) {
    const users = [...props.users];

    return (
        <div className={s.catalog}>
            {
                users.map(user => {
                    return <CatalogUserCard name={user.name}
                                            surname={user.surname}
                                            shortDescription={user.shortDescription}
                                            userID={user.id}
                                            mail={user.email}
                                            avatar={user.avatarSource}
                                            likes={user.likesCount}
                                            projects={user.projectsCount}
                                            tags={JSON.parse(user.tags)}
                    />
                })
            }
        </div>
    )
}

export default Catalog;
