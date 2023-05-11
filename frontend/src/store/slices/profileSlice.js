import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async function (userID, {rejectWithValue, dispatch}) {
        try {
            debugger
            let response = await fetch(
                `${API.GET_USER}?ID=${userID ?? "1"}`,
                {
                    method: 'get'
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
            dispatch(setProfile(response.data));
            console.log(response)

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const uploadResume = createAsyncThunk(
    'profile/uploadresumefile',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const formData = new FormData();
            formData.append('resume', payload.file);
            let response = await fetch(
                `${API.UPLOAD_RESUME_FILE}?userID=${payload.userID ?? "1"}`,
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
            dispatch(getProfile(payload.userID));
            // dispatch(setProfile(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/update',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.UPDATE_PROFILE}`,
                {
                    method: 'post',
                    body: JSON.stringify(payload)
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
            dispatch(getProfile(payload.userID));
            // dispatch(setProfile(response.data));

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
    id: null,
    login: null,
    email: null,
    phone: null,
    surname: null,
    name: null,
    shortDescription: null,
    logoSource: null,
    photoSource: null,
    cvSource: null,
    activate: null,
    visible: "Public",
    tags: [],
    positions: [],
    informationBlocks: [],
    links: [],
    isLoading: true,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action) {
            console.log("setProfile");
            removeProfile();
            // console.log(action);
            if (action.payload.id)
                state.id = action.payload.id;
            if (action.payload.login)
                state.login = action.payload.login;
            if (action.payload.email)
                state.email = action.payload.email;
            if (action.payload.phone)
                state.phone = action.payload.phone;
            if (action.payload.surname)
                state.surname = action.payload.surname;
            if (action.payload.name)
                state.name = action.payload.name;
            if (action.payload.shortDescription)
                state.shortDescription = action.payload.shortDescription;
            if (!action.payload.shortDescription && action.payload.shortDescription === "")
                state.shortDescription = action.payload.shortDescription;
            if (action.payload.logoSource)
                state.logoSource = action.payload.logoSource;
            if (!action.payload.logoSource && action.payload.logoSource === "")
                state.logoSource = action.payload.logoSource;
            if (action.payload.photoSource)
                state.photoSource = action.payload.photoSource;
            if (!action.payload.photoSource && action.payload.photoSource === "")
                state.photoSource = action.payload.photoSource;
            if (action.payload.cvSource)
                state.cvSource = action.payload.cvSource;
            if (!action.payload.cvSource && action.payload.cvSource === "")
                state.cvSource = action.payload.cvSource;
            if (action.payload.activate)
                state.activate = parseInt(action.payload.activate);
            if (action.payload.visible)
                state.visible = action.payload.visible;
            if (action.payload.tags)
                if (action.payload.tags.length)
                    state.tags = JSON.parse(action.payload.tags);
                else
                    state.tags = [];
            if (action.payload.positions)
                state.positions = action.payload.positions;
            if (action.payload.informationBlocks)
                state.informationBlocks = action.payload.informationBlocks;
            if (action.payload.links)
                state.links = action.payload.links;
            state.isLoading = false;
        },
        removeProfile(state) {
            state.id = null;
            state.login = null;
            state.email = null;
            state.phone = null;
            state.surname = null;
            state.name = null;
            state.shortDescription = null;
            state.logoSource = null;
            state.photoSource = null;
            state.cvSource = null;
            state.activate = null;
            state.visible = "Public";
            state.tags = [];
            state.positions = [];
            state.informationBlocks = [];
            state.links = [];
            state.isLoading = true;
        }
        //   state.secondName = null;
        //   state.firstName = null;
        //   state.patronymic = null;
        //   state.phone = null;
        //   state.telegram = null;
        //   state.university = null;
        //   state.faculty = null;
        //   state.speciality = null;
        //   state.course = null;
        //   state.workExperience = null;
        // },
    },
    extraReducers: {
        [getProfile.pending]: (state, action) => {
        },
        [getProfile.fulfilled]: (state, action) => {
        },
        [getProfile.rejected]: (state, action) => {
        },
        [uploadResume.pending]: (state, action) => {
        },
        [uploadResume.fulfilled]: (state, action) => {
        },
        [uploadResume.rejected]: (state, action) => {
        },
        // [fillProfileInfo.pending]: (state, action) => {},
        // [fillProfileInfo.fulfilled]: (state, action) => {},
        // [fillProfileInfo.rejected]: (state, action) => {},
    },
});

export const {setProfile, removeProfile} = profileSlice.actions;

export default profileSlice.reducer;
