import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/API";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

export const getProject = createAsyncThunk(
  'project/getProject',
  async function (projectID, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(
        `${API.GET_PROJECT}?ID=${projectID}`,
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

      dispatch(setProject(response.data));

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
  name: null,
  year: null,
  description: null,
  rating: 0,
  informationBlocks: [],
  screenshots: [],
  comments: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setProject(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.year = action.payload.year;
      state.description = action.payload.description;
      state.rating = action.payload.rating;
      state.informationBlocks = action.payload.informationBlocks;
      state.screenshots = action.payload.screenshots;
      state.comments = action.payload.comments;
    }
    // removeProfile(state) {
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
    [getProject.pending]: (state, action) => {},
    [getProject.fulfilled]: (state, action) => {},
    [getProject.rejected]: (state, action) => {},
    // [fillProfileInfo.pending]: (state, action) => {},
    // [fillProfileInfo.fulfilled]: (state, action) => {},
    // [fillProfileInfo.rejected]: (state, action) => {},
  },
});
export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
