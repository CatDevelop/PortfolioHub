import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

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
                //if (response.status === 401) dispatch(removeUser());

                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
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
//
// export const fillProfileInfo = createAsyncThunk(
//   'profile/fillInfo',
//   async function (payload, { rejectWithValue, dispatch }) {
//     try {
//       const userId = localStorage.getItem('userId');
//       const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
//
//       payload = { ...payload, userId };
//       let response = await fetch(PROFILE_API.FILL_INFO_URL, {
//         method: 'post',
//         headers: {
//           Authorization: accessToken,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//
//       if (!response.ok) {
//         if (response.status === 401) dispatch(removeUser());
//
//         throw new Error(
//           `${response.status}${
//             response.statusText ? ' ' + response.statusText : ''
//           }`
//         );
//       }
//
//       response = response.json();
//
//       dispatch(getProfile());
//
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
//
// export const updateProfileInfo = createAsyncThunk(
//   'profile/updateProfileInfo',
//   async function (payload, { rejectWithValue, dispatch, getState }) {
//     try {
//       const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
//       const userId = localStorage.getItem('userId');
//
//       payload = { ...payload, userId };
//
//       let response = fetch(PROFILE_API.UPDATE_INFO_URL, {
//         method: 'put',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: accessToken,
//         },
//         body: JSON.stringify(payload),
//       });
//
//       if (!response.ok) {
//         if (response.status === 401) {
//           dispatch(removeUser());
//           dispatch(removeProfile());
//         }
//
//         throw new Error(
//           `${response.status}${
//             response.statusText ? ' ' + response.statusText : ''
//           }`
//         );
//       }
//
//       response = response.json();
//
//       dispatch(getProfile());
//
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
    categories: [],
    isLoading: true
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        setProjects(state, action) {
            debugger
            state.categories = action.payload.categories;
            state.isLoading = false;
        },
        removeProjects(state) {
            state.categories = [];
            state.isLoading = true;
        },
    },
    extraReducers: {
        [getProjects.pending]: (state, action) => {
        },
        [getProjects.fulfilled]: (state, action) => {
        },
        [getProjects.rejected]: (state, action) => {
        },
        // [fillProfileInfo.pending]: (state, action) => {},
        // [fillProfileInfo.fulfilled]: (state, action) => {},
        // [fillProfileInfo.rejected]: (state, action) => {},
    },
});
export const {setProjects, removeProjects} = projectsSlice.actions;

export default projectsSlice.reducer;
