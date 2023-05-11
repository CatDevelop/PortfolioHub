import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { useNavigate } from "react-router-dom";
import API from '../../api/API';
// import {getProfile} from "./profileSlice";
// import {togglePopup} from "./popupSlice";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginNotify = () => toast.success('🦄 Вы успешно авторизовались!', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const registrationNotify = () => toast.success('🦄 Вы успешно зарегестрировались в системе!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

export const signInUser = createAsyncThunk(
    'user/signIn',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.SIGN_IN, {
                method: 'post',
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                alert("Username or password is incorrect");
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }
            response = await response.json();

            dispatch(setUser(response.data));
            // dispatch(getProfile());

            loginNotify();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUp',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.SIGN_UP, {
                method: 'post',
                body: JSON.stringify(user)
            });
            debugger;
            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();

            dispatch(signInUser(user));
            //dispatch(togglePopup("signUp"));
            registrationNotify();

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const activateUser = createAsyncThunk(
    'user/activate',
    async function (link, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.ACTIVATE, {
                method: 'post',
                body: JSON.stringify(link)
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();
            // console.log(response)

            // dispatch(signInUser(user));
            //dispatch(togglePopup("signUp"));
            // registrationNotify();

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    email: null,
    id: null,

    status: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;

            localStorage.setItem('PortfolioHub-userId', action.payload.id);
            localStorage.setItem('PortfolioHub-email', action.payload.email);
        },
        removeUser(state) {
            state.email = null;
            state.id = null;

            localStorage.removeItem('PortfolioHub-userId');
            localStorage.removeItem('PortfolioHub-email');
        },
    },
    extraReducers: {
        [signInUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [signUpUser.pending]: (state, action) => {
        },
        [signUpUser.fulfilled]: (state, action) => {
        },
        [signUpUser.rejected]: (state, action) => {
        },
        [activateUser.pending]: (state, action) => {
        },
        [activateUser.fulfilled]: (state, action) => {
        },
        [activateUser.rejected]: (state, action) => {
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
