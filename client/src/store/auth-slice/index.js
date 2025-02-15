import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,  // Added to store errors
};

export const registerUser = createAsyncThunk('/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            console.log("Sending Registration Data:", formData);
            
            const response = await axios.post('http://localhost:5000/api/auth/register', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            

            console.log("Response Data:", response.data);
            return response.data;  // This goes to `fulfilled`
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Store error message
            });
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
