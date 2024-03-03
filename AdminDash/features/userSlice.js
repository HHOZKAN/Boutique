import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:5050/api/users/login', userData);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:5050/api/users', userData);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getUserProfile = createAsyncThunk('user/profile', async (_, { rejectWithValue, getState }) => {
    const { user } = getState();
    try {
        const { data } = await axios.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getAllUsers = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:5050/api/users');
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (userUpdates, { rejectWithValue, getState }) => {
        const { user } = getState();
        try {
            const { data } = await axios.put(`http://localhost:5050/api/users/profile/${userUpdates.id}`, userUpdates, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getLastRegisteredUsers = createAsyncThunk('user/getLastRegistered', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:5050/api/users/lastRegistered');
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        token: null,
        user: null,
        allUsers: [],
        lastRegisteredUsers: [],
    },
    reducers: {
        logoutUser: (state) => {
            // Suprime le token du local storage
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.token = null;
        },
        restoreUser: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                // STOCKE LE TOKEN DANS LE LOCAL STORAGE
                localStorage.setItem('token', action.payload.token);
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                // STOCKE LE TOKEN DANS LE LOCAL STORAGE
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })

            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
            .addCase(getLastRegisteredUsers.fulfilled, (state, action) => {
                state.lastRegisteredUsers = action.payload;
            })
    },

});

export const { logoutUser, restoreUser } = userSlice.actions;
export const asyncActions = { loginUser, registerUser, getUserProfile, getAllUsers, updateUserProfile, getLastRegisteredUsers };

export default userSlice.reducer;