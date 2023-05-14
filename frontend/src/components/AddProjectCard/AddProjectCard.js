import React from "react";
import s from './AddProjectCard.module.css';

export const AddProjectCard = (props) => {
    return (
        <div className={s.projectCard}>
            <p className={s.row} onClick={() => {
                props.setAddProjectModalActive(true)
                props.setAddProjectCategoryID({id: props.categoryID, name: props.categoryName})
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12.0016 3.6001C12.6643 3.6001 13.2016 4.13736 13.2016 4.8001V10.8001H19.2016C19.8643 10.8001 20.4016 11.3374 20.4016 12.0001C20.4016 12.6628 19.8643 13.2001 19.2016 13.2001H13.2016V19.2001C13.2016 19.8628 12.6643 20.4001 12.0016 20.4001C11.3388 20.4001 10.8016 19.8628 10.8016 19.2001V13.2001H4.80156C4.13882 13.2001 3.60156 12.6628 3.60156 12.0001C3.60156 11.3374 4.13882 10.8001 4.80156 10.8001L10.8016 10.8001V4.8001C10.8016 4.13736 11.3388 3.6001 12.0016 3.6001Z"
                          fill="white"/>
                </svg>

                Создать проект
            </p>


            <p className={s.row} onClick={() => {
                props.setImportProjectModalActive(true)
                props.setImportProjectCategoryID({id: props.categoryID, name: props.categoryName})
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M3.60156 20.3999C3.60156 19.7372 4.13882 19.1999 4.80156 19.1999H19.2016C19.8643 19.1999 20.4016 19.7372 20.4016 20.3999C20.4016 21.0626 19.8643 21.5999 19.2016 21.5999H4.80156C4.13882 21.5999 3.60156 21.0626 3.60156 20.3999ZM7.55303 11.1514C8.02166 10.6827 8.78146 10.6827 9.25009 11.1514L10.8016 12.7028L10.8016 3.5999C10.8016 2.93716 11.3388 2.3999 12.0016 2.3999C12.6643 2.3999 13.2016 2.93716 13.2016 3.5999L13.2016 12.7028L14.753 11.1514C15.2217 10.6827 15.9815 10.6827 16.4501 11.1514C16.9187 11.62 16.9187 12.3798 16.4501 12.8484L12.8501 16.4484C12.625 16.6735 12.3198 16.7999 12.0016 16.7999C11.6833 16.7999 11.3781 16.6735 11.153 16.4484L7.55303 12.8484C7.0844 12.3798 7.0844 11.62 7.55303 11.1514Z"
                          fill="white"/>
                </svg>
                Импортировать проект
            </p>
        </div>
    )
}
