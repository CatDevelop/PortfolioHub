import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {toast} from "react-toastify";
// import PROFILE_API from '../../api/profileAPI';
// import { removeUser } from './userSlice';

let uploadResumeToast;
let uploadAvatarToast;
let uploadBannerToast;
let updateProfileToast;
let updatePasswordToast;

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
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getProfile(payload.userID));
            // dispatch(setProfile(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    'profile/uploadavatar',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.file);
            let response = await fetch(
                `${API.UPLOAD_AVATAR}?userID=${payload.userID ?? "1"}`,
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
            dispatch(getProfile(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadBanner = createAsyncThunk(
    'profile/uploadbanner',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const formData = new FormData();
            formData.append('profileImage', payload.file);
            let response = await fetch(
                `${API.UPLOAD_BANNER}?userID=${payload.userID ?? "1"}`,
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
            dispatch(getProfile(payload.userID));
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
                response = await response.json();
                throw new Error(
                    `${response.error}`
                );
            }

            response = await response.json();
            dispatch(getProfile(payload.userID));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'profile/password/update',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.UPDATE_PASSWORD}`,
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
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    id: null,
    login: null,
    email: null,
    phone: null,
    surname: null,
    name: null,
    shortDescription: null,
    projectsCount: 0,
    likesCount: 0,
    logoSource: null,
    avatarSource: null,
    bannerSource: null,
    cvSource: null,
    activate: null,
    visible: "Public",
    tags: [],
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
            if ("id" in action.payload)
                state.id = action.payload.id;
            if ("login" in action.payload)
                state.login = action.payload.login;
            if ("email" in action.payload)
                state.email = action.payload.email;
            if ("phone" in action.payload)
                state.phone = action.payload.phone;
            if ("surname" in action.payload)
                state.surname = action.payload.surname;
            if ("name" in action.payload)
                state.name = action.payload.name;
            if ("shortDescription" in action.payload)
                state.shortDescription = action.payload.shortDescription;
            if ("logoSource" in action.payload)
                state.logoSource = action.payload.logoSource;
            if ("avatarSource" in action.payload)
                state.avatarSource = action.payload.avatarSource;
            if ("bannerSource" in action.payload)
                state.bannerSource = action.payload.bannerSource;
            if ("cvSource" in action.payload)
                state.cvSource = action.payload.cvSource;
            if ("activate" in action.payload)
                state.activate = parseInt(action.payload.activate);
            if ("visible" in action.payload)
                state.visible = action.payload.visible;
            if ("tags" in action.payload)
                if (action.payload.tags.length)
                    state.tags = JSON.parse(action.payload.tags);
                else
                    state.tags = [];
            if ("links" in action.payload)
                state.links = action.payload.links;
            if ("projectsCount" in action.payload)
                state.projectsCount = action.payload.projectsCount;
            if ("likesCount" in action.payload)
                state.likesCount = action.payload.likesCount;
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
        [updateProfile.pending]: (state, action) => {
            updateProfileToast = toast.loading("Изменяю личную информацию на сервере...")
        },
        [updateProfile.fulfilled]: (state, action) => {
            toast.update(updateProfileToast,
                {
                    render: "Личная информация успешно изменена",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [updateProfile.rejected]: (state, action) => {
            toast.update(updateProfileToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [uploadAvatar.pending]: (state, action) => {
            uploadAvatarToast = toast.loading("Загружаю ваш аватар на сервер...")
        },
        [uploadAvatar.fulfilled]: (state, action) => {
            toast.update(uploadAvatarToast,
                {
                    render: "Аватар успешно загружен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [uploadAvatar.rejected]: (state, action) => {
            toast.update(uploadAvatarToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [uploadBanner.pending]: (state, action) => {
            uploadBannerToast = toast.loading("Загружаю баннер портфолио на сервер...")
        },
        [uploadBanner.fulfilled]: (state, action) => {
            toast.update(uploadBannerToast,
                {
                    render: "Баннер портфолио успешно загружен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [uploadBanner.rejected]: (state, action) => {
            toast.update(uploadBannerToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [uploadResume.pending]: (state, action) => {
            uploadResumeToast = toast.loading("Загружаю файл резюме на сервер...")
        },
        [uploadResume.fulfilled]: (state, action) => {
            toast.update(uploadResumeToast,
                {
                    render: "Резюме успешно загружено",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [uploadResume.rejected]: (state, action) => {
            toast.update(uploadResumeToast,
                { render: "Ошибка при загрузке резюме\n"+action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [updatePassword.pending]: (state, action) => {
            updatePasswordToast = toast.loading("Изменяю пароль...")
        },
        [updatePassword.fulfilled]: (state, action) => {
            toast.update(updatePasswordToast,
                {
                    render: "Пароль успешно изменён",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [updatePassword.rejected]: (state, action) => {
            toast.update(updatePasswordToast,
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

export const {setProfile, removeProfile} = profileSlice.actions;

export default profileSlice.reducer;
