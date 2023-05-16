import React, {useEffect, useRef, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../store/slices/profileSlice";
import { useDispatch } from 'react-redux';
import {useProfile} from "../hooks/use-profile";
import PortfolioUpperPart from "../components/PortfolioUpperPart/PortfolioUpperPart";
import {useAuth} from "../hooks/use-auth";
import {
    deleteProjectCategory,
    deleteProjectFromCategory,
    getProjects,
    importProjectToCategory
} from "../store/slices/projectsSlice";
import {useProjects} from "../hooks/use-projects";
import AddProjectCategoryForm from "../components/AddProjectCategoryForm/AddProjectCategoryForm";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import s from "./Pages.module.css";
import {ModalWindow} from "../components/ModalWindow/ModalWindow";
import SelectProjectsTable from "../components/SelectProjectsTable/SelectProjectsTable";
import Button from "../components/Button/Button";
import AddProjectForm from "../components/AddProjectForm/AddProjectForm";
import {useForm} from "react-hook-form";
import Loading from "../components/Loading/Loading";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const [importProjectModalActive, setImportProjectModalActive] = useState(false);
    const [addProjectModalActive, setAddProjectModalActive] = useState(false);
    const [importProjectCategoryID, setImportProjectCategoryID] = useState({id:0, name:""});
    const [addProjectCategoryID, setAddProjectCategoryID] = useState(null);
    const [selectProjectID, setSelectProjectID] = useState();
    const [isAddCategory, setIsAddCategory] = useState(false);

    const {register: registerAddProject, watch: watchAddProject, setValue: setValueAddProject, getValues: getValuesAddProject, handleSubmit: handleSubmitAddProject, reset: resetAddProject, formState: {errors: errorsAddProject}} = useForm({
        defaultValues: {
            addProjectName: '',
            addProjectDescription: '',
            addProjectPreviewSource: '',
            addProjectYear: '',
        },
        mode: "onBlur"
    });

    const watchImageFile = watchAddProject("addProjectPreviewSource", '');

    if(user.id !== userId)
        return <Navigate to='/' />;

    if(projects.isLoading)
        return <Loading />;

    const handleSubmit = () => {
        // const data = {
        //     userID: user.id,
        //     portfolio: JSON.stringify(portfolioEdit)
        // }
        // dispatch(updatePortfolio(data)).then(()=>{
        //     navigate("/"+user.id);
        // });
    }

    const addProject = () => {
        setAddProjectModalActive(true);
        setAddProjectCategoryID(null);
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

    const deleteFromCategory = (categoryID, projectID) => {
        const data = {
            userID: parseInt(userId),
            categoryID: parseInt(categoryID),
            projectID: parseInt(projectID)
        }
        dispatch(deleteProjectFromCategory(data));
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
            setCurrentPage(1);
        });
    }

    return (
        <div>
            <PortfolioUpperPart name={profile.name}
                                surname={profile.surname}
                                avatar={profile.avatarSource}
                                banner={profile.bannerSource}
                                tags={profile.tags}
                                shortDescription={profile.shortDescription}
                                likes={profile.likesCount}
                                projects={profile.projectsCount}
                                edit={true}
                                editProjects={true}
                                yourAccount={user.id === profile.id}
                                handleSubmit={handleSubmit}
                                addCategory={addCategory}
                                addProject={addProject}
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
                                              deleteFromCategory={deleteFromCategory}
                                              importProjectModalActive={importProjectModalActive}
                                              setImportProjectModalActive={setImportProjectModalActive}
                                              importProjectCategoryID={importProjectCategoryID}
                                              setImportProjectCategoryID={setImportProjectCategoryID}
                                              addProjectModalActive={addProjectModalActive}
                                              setAddProjectModalActive={setAddProjectModalActive}
                                              addProjectCategoryID={addProjectCategoryID}
                                              setAddProjectCategoryID={setAddProjectCategoryID}
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
                           userID={userId}
            />
            <ModalWindow active={importProjectModalActive} setActive={setImportProjectModalActive} onClose={()=> {
                setSelectProjectID(null);
                setCurrentPage(1);
            }}>
                <p className={s.importProjectModalTitle}>
                    Выберите проект для импорта в категорию
                    <p className={s.importProjectModalTitleCategoryName}>{importProjectCategoryID.name}</p>
                </p>
                <SelectProjectsTable projects={projects.uncategorizedProjects.slice(itemsPerPage*(currentPage-1), itemsPerPage*currentPage)}
                                     selectProjectID={selectProjectID}
                                     setSelectProjectID={setSelectProjectID}
                />
                <Pagination total={projects.uncategorizedProjects.length}
                            current={ currentPage }
                            onChange={page => setCurrentPage(page)}
                            pageSize={itemsPerPage}
                            hideOnSinglePage
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

            <ModalWindow active={addProjectModalActive} setActive={setAddProjectModalActive} onClose={()=> {
                setAddProjectCategoryID(null);
                resetAddProject();
            }}>
                <AddProjectForm userID={userId}
                                addProjectCategoryID={addProjectCategoryID}
                                register={registerAddProject}
                                handleSubmit={handleSubmitAddProject}
                                reset={resetAddProject}
                                errors={errorsAddProject}
                                addProjectModalActive={addProjectModalActive}
                                setAddProjectModalActive={setAddProjectModalActive}
                                setAddProjectCategoryID={setAddProjectCategoryID}
                                watchImageFile={watchImageFile}
                                getValues={getValuesAddProject}
                                setValue={setValueAddProject}
                />
            </ModalWindow>
        </div>
    )
}
