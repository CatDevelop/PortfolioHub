import React, {useEffect, useRef, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {useAuth} from "../hooks/use-auth";
import {deleteProjectCategory, getProjects, importProjectToCategory} from "../store/slices/projectsSlice";
import {useProjects} from "../hooks/use-projects";
import AddProjectCategoryForm from "../components/AddProjectCategoryForm/AddProjectCategoryForm";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import s from "./Pages.module.css";
import {ModalWindow} from "../components/ModalWindow/ModalWindow";
import SelectProjectsTable from "../components/SelectProjectsTable/SelectProjectsTable";
import Button from "../components/Button/Button";

export const EditProjectsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useAuth();
    useEffect(() => {
        dispatch(getProfile(userId));
        dispatch(getProjects(userId));
        debugger
    }, []);

    const profile = useProfile();
    const navigate = useNavigate();
    const projects = useProjects();

    const scrollToRef = useRef();

    const [editProjects, setEditProjects] = useState(projects);

    const [importProjectModalActive, setImportProjectModalActive] = useState(false);
    const [importProjectCategoryID, setImportProjectCategoryID] = useState({id:0, name:""});
    const [selectProjectID, setSelectProjectID] = useState();
    const [isAddCategory, setIsAddCategory] = useState(false);

    if(user.id !== userId)
        return <Navigate to='/' />;

    const handleSubmit = () => {
        // const data = {
        //     userID: user.id,
        //     portfolio: JSON.stringify(portfolioEdit)
        // }
        // dispatch(updatePortfolio(data)).then(()=>{
        //     navigate("/"+user.id);
        // });
    }

    const addCategory = () => {
        setIsAddCategory(true);
        scrollToRef.current.scrollIntoView()
        console.log("AddCategory")
    }

    const deleteCategory = (categoryID) => {
        const data = {
            userID: parseInt(userId),
            categoryID: parseInt(categoryID)
        }
        dispatch(deleteProjectCategory(data));
    }

    const importProject = (payload) => {
        const data = {
            userID: parseInt(userId),
            categoryID: parseInt(payload.categoryID),
            projectID: parseInt(payload.selectProjectID)
            // portfolio: JSON.stringify(portfolioEdit)
        }
        console.log(data)
        dispatch(importProjectToCategory(data)).then(()=>{
            setImportProjectModalActive(false);
            selectProjectID(null);
        });
    }

    return (
        <div>
            <PortfolioUpperPart name={profile.name}
                                surname={profile.surname}
                                tags={profile.tags}
                                shortDescription={profile.shortDescription}
                                likes={profile.likesCount}
                                projects={profile.projectsCount}
                                edit={true}
                                editProjects={true}
                                yourAccount={user.id === profile.id}
                                handleSubmit={handleSubmit}
                                addCategory={addCategory}
            />
            <p className={s.editTitle}>Режим редактирования</p>
            {
                projects.categories.length !== 0 ?
                    projects.categories.map(projectCategory => {
                        return <ProjectsTable projects={projectCategory.projects}
                                              id={projectCategory.id}
                                              title={projectCategory.name}
                                              edit={true}
                                              deleteCategory={deleteCategory}
                                              importProjectModalActive={importProjectModalActive}
                                              setImportProjectModalActive={setImportProjectModalActive}
                                              importProjectCategoryID={importProjectCategoryID}
                                              setImportProjectCategoryID={setImportProjectCategoryID}
                        />
                    }) : <p></p>
            }
            <AddProjectCategoryForm userID={userId}
                                    scrollToRef={scrollToRef}
                                    isAdd={isAddCategory}
                                    setIsAdd={setIsAddCategory}
            />

            <ProjectsTable projects={projects.uncategorizedProjects}
                           title={"Проекты без категории"}
                           description={"(Не отображаются в профиле)"}
            />
            <ModalWindow active={importProjectModalActive} setActive={setImportProjectModalActive} onClose={()=>setSelectProjectID(null)}>
                <p className={s.importProjectModalTitle}>
                    Выберите проект для импорта в категорию
                    <p className={s.importProjectModalTitleCategoryName}>{importProjectCategoryID.name}</p>
                </p>
                <SelectProjectsTable projects={projects.uncategorizedProjects}
                                     selectProjectID={selectProjectID}
                                     setSelectProjectID={setSelectProjectID}
                />
                <div className={s.importProjectButton}>
                    <Button onClick={()=>importProject(
                    {
                        categoryID: importProjectCategoryID.id,
                        categoryName: importProjectCategoryID.name,
                        selectProjectID: selectProjectID
                    })}>Импортировать</Button>
                </div>
            </ModalWindow>
        </div>
    )
}
