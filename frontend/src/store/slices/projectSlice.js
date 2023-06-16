import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getProjects} from "./projectsSlice";
import {getProfile} from "./profileSlice";
import {toast} from "react-toastify";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

let addProjectNotify;
let addCommentNotify;
let deleteProjectNotify;
let updateProjectNotify;
let uploadProjectImageNotify;
let uploadProjectPreviewNotify;

export const getProject = createAsyncThunk(
    'project/get',
    async function (projectID, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.GET_PROJECT}?projectID=${projectID}`,
                {
                    method: 'get',
                }
            );

            if (!response.ok) {
                dispatch(setLoadingProject(false))
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();

            dispatch(setProject(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addProject = createAsyncThunk(
    'project/add',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.ADD_PROJECT}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                //if (response.status === 401) dispatch(removeUser());

                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
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

export const deleteProject = createAsyncThunk(
    'project/delete',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.DELETE_PROJECT}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                //if (response.status === 401) dispatch(removeUser());

                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
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

export const uploadProjectPreview = createAsyncThunk(
    'project/uploadpreview',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const formData = new FormData();
            formData.append('preview', payload.file);
            let response = await fetch(
                `${API.UPLOAD_PROJECT_PREVIEW}?projectID=${payload.projectID ?? "1"}`,
                {
                    method: 'post',
                    body: formData
                }
            );

            if (!response.ok) {
                //if (response.status === 401) dispatch(removeUser());*/

                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();
            console.log(response);
            dispatch(getProjects(payload.userID));
            // dispatch(setProfile(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProject = createAsyncThunk(
    'project/update',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.UPDATE_PROJECT}`,
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
            dispatch(getProject(payload.projectID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addComment = createAsyncThunk(
    'project/comment/add',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.ADD_COMMENT}`,
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
            dispatch(getProject(payload.projectID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadProjectImage = createAsyncThunk(
    'project/uploadImage',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const formData = new FormData();
            formData.append('projectImage', payload.file);
            let response = await fetch(
                `${API.UPLOAD_PROJECT_IMAGE}?projectID=${payload.projectID ?? "1"}`,
                {
                    method: 'post',
                    body: formData
                }
            );

            if (!response.ok) {
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getProject(payload.projectID));
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    userId: null,
    name: null,
    year: null,
    shortDescription: null,
    image: null,
    preview: null,
    rating: 0,
    inCategory: false,
    comments: [],
    blocks: [],
    isLoading: true,
};

const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
        setProject(state, action) {
            state.id = action.payload.id;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.year = action.payload.year;
            state.shortDescription = action.payload.shortDescription;
            state.rating = action.payload.rating;
            state.inCategory = action.payload.inCategory;
            state.image = action.payload.image;
            state.preview = action.payload.preview;
            state.comments = action.payload.comments;
            state.blocks = JSON.parse(action.payload.blocks);
            state.isLoading = false;
        },
        setLoadingProject(state, action) {
            state.isLoading = action.payload
        },
        removeProject(state, action) {
            state.id = null;
            state.name = null;
            state.year = null;
            state.shortDescription = null;
            state.image = null;
            state.rating = 0;
            state.inCategory = false;
            state.comments = [];
            state.blocks = [];
            state.isLoading = true;
        }
    },
    extraReducers: {
        [addProject.pending]: (state, action) => {
            addProjectNotify = toast.loading("Добавляю проект...")
        },
        [addProject.fulfilled]: (state, action) => {
            toast.update(addProjectNotify,
                {
                    render: "Проект успешно добавлен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [addProject.rejected]: (state, action) => {
            toast.update(addProjectNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [addComment.pending]: (state, action) => {
            addCommentNotify = toast.loading("Отправляю комментарий...")
        },
        [addComment.fulfilled]: (state, action) => {
            toast.update(addCommentNotify,
                {
                    render: "Комментарий успешно отправлен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [addComment.rejected]: (state, action) => {
            toast.update(addCommentNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [deleteProject.pending]: (state, action) => {
            deleteProjectNotify = toast.loading("Удаляю проект...")
        },
        [deleteProject.fulfilled]: (state, action) => {
            toast.update(deleteProjectNotify,
                {
                    render: "Проект успешно удалён!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [deleteProject.rejected]: (state, action) => {
            toast.update(deleteProjectNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [updateProject.pending]: (state, action) => {
            updateProjectNotify = toast.loading("Обновляю проект...")
        },
        [updateProject.fulfilled]: (state, action) => {
            toast.update(updateProjectNotify,
                {
                    render: "Информация о проект успешно изменена",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [updateProject.rejected]: (state, action) => {
            toast.update(updateProjectNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },

        [uploadProjectPreview.pending]: (state, action) => {
            uploadProjectPreviewNotify = toast.loading("Загружаю превью проекта...")
        },
        [uploadProjectPreview.fulfilled]: (state, action) => {
            toast.update(uploadProjectPreviewNotify,
                {
                    render: "Превью проекта успешно загружено",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [uploadProjectPreview.rejected]: (state, action) => {
            toast.update(uploadProjectPreviewNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },

        [uploadProjectImage.pending]: (state, action) => {
            uploadProjectImageNotify = toast.loading("Загружаю баннер проекта...")
        },
        [uploadProjectImage.fulfilled]: (state, action) => {
            toast.update(uploadProjectImageNotify,
                {
                    render: "Баннер проекта успешно загружен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [uploadProjectImage.rejected]: (state, action) => {
            toast.update(uploadProjectImageNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        // [fillProfileInfo.pending]: (state, action) => {},
        // [fillProfileInfo.fulfilled]: (state, action) => {},
        // [fillProfileInfo.rejected]: (state, action) => {},
    },
});
export const {setProject, setLoadingProject, removeProject} = projectSlice.actions;

export default projectSlice.reducer;
