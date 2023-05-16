import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getProfile} from "./profileSlice";
import {toast} from "react-toastify";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

let addProjectCategoryToast;
let deleteProjectCategoryToast;
let importProjectToCategoryToast;
let deleteProjectFromCategoryToast;

export const getProjects = createAsyncThunk(
    'projects/getProjects',
    async function (userID, {rejectWithValue, dispatch}) {
        try {
            debugger
            console.log("getProjects");
            let response = await fetch(
                `${API.GET_PROJECTS}?UserID=${userID}`,
                {
                    method: 'get',
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();

            dispatch(setProjects(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addProjectCategory = createAsyncThunk(
    'projects/category/add',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            debugger
            let response = await fetch(
                `${API.ADD_PROJECT_CATEGORY}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            console.log(response)
            dispatch(getProjects(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const importProjectToCategory = createAsyncThunk(
    'projects/category/importProject',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            debugger

            let response = await fetch(
                `${API.IMPORT_PROJECT_TO_CATEGORY}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            console.log(response)
            dispatch(getProjects(payload.userID));
            dispatch(getProfile(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProjectFromCategory = createAsyncThunk(
    'projects/category/deleteProject',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            debugger

            let response = await fetch(
                `${API.DELETE_PROJECT_FROM_CATEGORY}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            console.log(response)
            dispatch(getProjects(payload.userID));
            dispatch(getProfile(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProjectCategory = createAsyncThunk(
    'projects/category/delete',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            debugger

            let response = await fetch(
                `${API.DELETE_PROJECT_CATEGORY}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getProjects(payload.userID));
            dispatch(getProfile(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    categories: [],
    uncategorizedProjects: [],
    isLoading: true
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        setProjects(state, action) {
            debugger
            state.categories = action.payload.projectsBlocks;
            state.uncategorizedProjects = action.payload.uncategorizedProjects;
            state.isLoading = false;
        },
        removeProjects(state) {
            state.categories = [];
            state.uncategorizedProjects= [];
            state.isLoading = true;
        },
    },
    extraReducers: {
        [addProjectCategory.pending]: (state, action) => {
            addProjectCategoryToast = toast.loading("Добавляю категорию проектов на сервер...")
        },
        [addProjectCategory.fulfilled]: (state, action) => {
            toast.update(addProjectCategoryToast,
                {
                    render: "Категория успешно добавлена",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [addProjectCategory.rejected]: (state, action) => {
            toast.update(addProjectCategoryToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [deleteProjectCategory.pending]: (state, action) => {
            deleteProjectCategoryToast = toast.loading("Удаляю категорию проектов...")
        },
        [deleteProjectCategory.fulfilled]: (state, action) => {
            toast.update(deleteProjectCategoryToast,
                {
                    render: "Категория успешно удалена",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [deleteProjectCategory.rejected]: (state, action) => {
            toast.update(deleteProjectCategoryToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [importProjectToCategory.pending]: (state, action) => {
            importProjectToCategoryToast = toast.loading("Импортирую проект в категорию...")
        },
        [importProjectToCategory.fulfilled]: (state, action) => {
            toast.update(importProjectToCategoryToast,
                {
                    render: "Проект успешно импортирован",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [importProjectToCategory.rejected]: (state, action) => {
            toast.update(importProjectToCategoryToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [deleteProjectFromCategory.pending]: (state, action) => {
            deleteProjectFromCategoryToast = toast.loading("Удаляю проект из категории...")
        },
        [deleteProjectFromCategory.fulfilled]: (state, action) => {
            toast.update(deleteProjectFromCategoryToast,
                {
                    render: "Проект успешно удалён из категории",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [deleteProjectFromCategory.rejected]: (state, action) => {
            toast.update(deleteProjectFromCategoryToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
    },
});
export const {setProjects, removeProjects} = projectsSlice.actions;

export default projectsSlice.reducer;
