import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
  user:
    JSON.parse(localStorage.getItem("studentUser")) ||
    JSON.parse(sessionStorage.getItem("studentUser")) ||
    null,
  loading: null,
  error: null,
  remember: false,
};

export const logIn = createAsyncThunk("dangNhap", async (payload) => {
  try {
    const data = await authAPI.getUserLogin(payload);
    sessionStorage.setItem("studentUser", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleRemember: (state, action) => {
      return { ...state, remember: !state.remember };
    },
    logOut: (state) => {
      sessionStorage.removeItem("studentUser");
      localStorage.removeItem("studentUser");
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (state.remember) {
        localStorage.setItem("studentUser", JSON.stringify(action.payload));
      }
      return { ...state, loading: false, user: action.payload, error: null };
    });
    builder.addCase(logIn.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error };
    });
  },
});
export const { handleRemember, logOut } = Auth.actions;
export default Auth.reducer;
