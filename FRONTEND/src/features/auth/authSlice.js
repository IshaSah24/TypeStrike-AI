import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

// -------------------------
// Login  thunk
// -------------------------
export const loginUser = createAsyncThunk(
  "/api/auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await client.post("/auth/login", { email, password });
      return response.data;
    } catch (err) {
      console.log(err);
      
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// -------------------------
// Registration thunk
// -------------------------
export const registerUser = createAsyncThunk(
  "/api/auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await client.post("/auth/register", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// -------------------------
// Get current  user (app  reload par)
// -------------------------
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get("/auth/me"); 
      console.log(response.data);
      return response.data;
      
    } catch (err) {
      return rejectWithValue(null); // user not logged in
    }
  }
);

// -------------------------
// Logout thunk
// -------------------------
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await client.post("/auth/logout");
      return true; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

// -------------------------
// Slice
// -------------------------

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // -------------------------
      // Register
      // -------------------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------
      // Login
      // -------------------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------
      // Fetch Current User
      // -------------------------
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;

          // localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })

      // -------------------------
      // Logout
      // -------------------------
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
