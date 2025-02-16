import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
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



export const loginUser = createAsyncThunk('/auth/login ',
    async (formData, { rejectWithValue }) => {
        try {
            console.log("Sending Registration Data:", formData);

            const response = await axios.post('http://localhost:5000/api/auth/login', JSON.stringify(formData), {
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

//Check Auth
export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
                withCredentials: true,
                headers: {
                    "Cache-Control": 'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
            });

            return response.data; // This goes to `fulfilled`
        } catch (error) {
            // You can handle the error here, for example:
            throw error; // This goes to `rejected`
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
        //Registeration
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Store error message
            })
            
            //Logging In
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Store error message
            })

            //Check Authentication
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Store error message
            });
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
