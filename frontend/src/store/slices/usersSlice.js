import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getProfile} from "./profileSlice";
import {toast} from "react-toastify";


export const getUsers = createAsyncThunk(
    'users/get',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.GET_USERS}`,
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

            dispatch(setUsers(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    isLoading: true
};

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers(state, action) {
            debugger
            state.users = action.payload;
            state.isLoading = false;
        },
        removeUsers(state) {
            state.users = [];
            state.isLoading = true;
        },
    },
    extraReducers: {

    },
});
export const {setUsers, removeUsers} = usersSlice.actions;

export default usersSlice.reducer;
