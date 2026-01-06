import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

// ------------------------------------
// LOAD USER FROM LOCAL STORAGE (FALLBACK)
// ------------------------------------
const storedUser = JSON.parse(localStorage.getItem("user"));

// ------------------------------------
// LOGIN
// ------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await client.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ------------------------------------
// REGISTER
// ------------------------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const res = await client.post("/auth/register", { email, password, name });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ------------------------------------
// FETCH CURRENT USER
// ------------------------------------
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get("/auth/me");
      return res.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

// ------------------------------------
// LOGOUT
// ------------------------------------
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await client.post("/auth/logout");
  return true;
});

// ------------------------------------
// SLICE
// ------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    isAuthenticated: !!storedUser,
    loading: !!storedUser,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------- LOGIN --------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.user = user;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- REGISTER --------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.user = user;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- FETCH CURRENT USER --------
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          state.isAuthenticated = !!state.user; 
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = !!state.user;
      })

      // -------- LOGOUT --------
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
