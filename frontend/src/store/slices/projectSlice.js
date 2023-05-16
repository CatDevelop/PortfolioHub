import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getProjects} from "./projectsSlice";
import {getProfile} from "./profileSlice";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

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

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadPreview = createAsyncThunk(
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

const initialState = {
    id: null,
    name: null,
    year: null,
    shortDescription: null,
    image: null,
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
            state.name = action.payload.name;
            state.year = action.payload.year;
            state.shortDescription = action.payload.shortDescription;
            state.rating = action.payload.rating;
            state.inCategory = action.payload.inCategory;
            state.image = action.payload.image;
            state.comments = action.payload.comments;
            state.blocks = JSON.parse(action.payload.blocks);
            state.isLoading = false;
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
        [getProject.pending]: (state, action) => {
        },
        [getProject.fulfilled]: (state, action) => {
        },
        [getProject.rejected]: (state, action) => {
        },
        // [fillProfileInfo.pending]: (state, action) => {},
        // [fillProfileInfo.fulfilled]: (state, action) => {},
        // [fillProfileInfo.rejected]: (state, action) => {},
    },
});
export const {setProject} = projectSlice.actions;

export default projectSlice.reducer;
