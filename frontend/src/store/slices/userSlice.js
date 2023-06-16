import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { useNavigate } from "react-router-dom";
import API from '../../api/API';
// import {getProfile} from "./profileSlice";
// import {togglePopup} from "./popupSlice";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let activateToast;
let signInToast;
let signUpToast;

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
                response = await response.json();
                throw new Error(
                    `${response.error}`
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
            signInToast = toast.loading("Вхожу в аккаунт...")
        },
        [signInUser.fulfilled]: (state, action) => {
            toast.update(signInToast,
                {
                    render: "Вы успешно авторизовались!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [signInUser.rejected]: (state, action) => {
            toast.update(signInToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },

        [signUpUser.pending]: (state, action) => {
            signUpToast = toast.loading("Создаю аккаунт...")
        },
        [signUpUser.fulfilled]: (state, action) => {
            toast.update(signUpToast,
                {
                    render: "Ваш аккаунт успешно создан!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [signUpUser.rejected]: (state, action) => {
            toast.update(signUpToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },

        [activateUser.pending]: (state, action) => {
            activateToast = toast.loading("Активирую аккаунт...")
        },
        [activateUser.fulfilled]: (state, action) => {
            toast.update(activateToast,
                {
                    render: "Аккаунт успешно активирован",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [activateUser.rejected]: (state, action) => {
            toast.update(activateToast,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
