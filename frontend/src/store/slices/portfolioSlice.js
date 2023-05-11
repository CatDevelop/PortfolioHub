import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

export const getPortfolio = createAsyncThunk(
    'portfolio/get',
    async function (userID, {rejectWithValue, dispatch}) {
        try {
            debugger
            let response = await fetch(
                `${API.GET_PORTFOLIO}?UserID=${userID ?? "1"}`,
                {
                    method: 'get'
                }
            );

            console.log(response)

            if (!response.ok) {
                //if (response.status === 401) dispatch(removeUser());*/
                //dispatch(setPortfolio({payload: {portfolio: [], updateDate:null}}));

                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();
            dispatch(setPortfolio(response.data));
            console.log(response)

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const addPortfolio = createAsyncThunk(
    'portfolio/add',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.ADD_PORTFOLIO}?userID=${payload.userID ?? "1"}`,
                {
                    method: 'post',
                    body: payload
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
            // dispatch(getProfile(payload.userID));
            // dispatch(setProfile(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updatePortfolio = createAsyncThunk(
    'portfolio/update',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.UPDATE_PORTFOLIO}`,
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
            dispatch(getPortfolio(payload.userID));
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
    portfolio: [],
    updateDate: null,
    isLoading: true,
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: initialState,
    reducers: {
        setPortfolio(state, action) {
            console.log("setPortfolio");
            removePortfolio();
            // console.log(action);
            state.portfolio = JSON.parse(action.payload.portfolio);
            state.updateDate = action.payload.updateDate;
            state.isLoading = false;
        },
        removePortfolio(state) {
            state.portfolio = [];
            state.updateDate = null;
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
        [getPortfolio.pending]: (state, action) => {
        },
        [getPortfolio.fulfilled]: (state, action) => {
        },
        [getPortfolio.rejected]: (state, action) => {
        },
        [addPortfolio.pending]: (state, action) => {
        },
        [addPortfolio.fulfilled]: (state, action) => {
        },
        [addPortfolio.rejected]: (state, action) => {
        },
        [updatePortfolio.pending]: (state, action) => {},
        [updatePortfolio.fulfilled]: (state, action) => {},
        [updatePortfolio.rejected]: (state, action) => {},
    },
});

export const {setPortfolio, removePortfolio} = portfolioSlice.actions;

export default portfolioSlice.reducer;
