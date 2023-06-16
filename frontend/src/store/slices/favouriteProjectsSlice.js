import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getProfile} from "./profileSlice";
import {toast} from "react-toastify";
import {getProjects} from "./projectsSlice";
import {getProject} from "./projectSlice";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

let addProjectCategoryToast;
let deleteProjectCategoryToast;
let importProjectToCategoryToast;
let deleteProjectFromCategoryToast;

export const getFavouriteProjects = createAsyncThunk(
    'favouriteProjects/getProjects',
    async function (userID, {rejectWithValue, dispatch}) {
        try {
            debugger
            console.log("getProjects");
            let response = await fetch(
                `${API.GET_FAVOURITE_PROJECTS}?userID=${userID}`,
                {
                    method: 'get',
                }
            );

            if (!response.ok) {
                dispatch(setLoadingFavouriteProjects(false))
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();

            dispatch(setFavouriteProjects(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addLike = createAsyncThunk(
    'favouriteProjects/add',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            debugger
            console.log("getProjects");
            let response = await fetch(
                `${API.ADD_LIKE}`,
                {
                    method: 'post',
                    body: JSON.stringify({userID: payload.selfID, projectID: payload.projectID})
                },
            );

            if (!response.ok) {
                dispatch(setLoadingFavouriteProjects(false))
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getFavouriteProjects(payload.selfID))
            dispatch(getProjects(payload.userID))
            dispatch(getProfile(payload.userID))
            dispatch(getProject(payload.projectID))



            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteLike = createAsyncThunk(
    'favouriteProjects/delete',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.DELETE_LIKE}`,
                {
                    method: 'post',
                    body: JSON.stringify({userID: payload.selfID, projectID: payload.projectID})
                },
            );

            if (!response.ok) {
                dispatch(setLoadingFavouriteProjects(false))
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getFavouriteProjects(payload.selfID))
            dispatch(getProjects(payload.userID))
            dispatch(getProfile(payload.userID))
            dispatch(getProject(payload.projectID))



            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    ids: [],
    projects: [],
    isLoading: true
};

const favouriteProjectsSlice = createSlice({
    name: 'favouriteProjects',
    initialState: initialState,
    reducers: {
        setFavouriteProjects(state, action) {
            console.log(action)
            state.ids = action.payload.ids;
            state.projects = action.payload.projects;
            state.isLoading = false;
        },
        setLoadingFavouriteProjects(state, action) {
            state.isLoading = action.payload
        },
        removeFavouriteProjects(state) {
            state.ids = [];
            state.projects = [];
            state.isLoading = true;
        },
    },
    extraReducers: {
    },
});
export const {setFavouriteProjects,setLoadingFavouriteProjects, removeFavouriteProjects} = favouriteProjectsSlice.actions;

export default favouriteProjectsSlice.reducer;
