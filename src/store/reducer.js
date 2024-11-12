// Redux Slice for Auth (authSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const storeReducer = createSlice({
  name: "storeReducer",
  initialState: {
    user: null, // user object should contain 'role' as well
    toast: {
      open: false,
      severity: "info", // can be 'error', 'success', 'warning', 'info'
      message: "",
      title: "",
    },
    drawerOpen: true,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },

    showToast: (state, action) => {
      const { severity, message } = action.payload;
      state.toast.open = true;
      state.toast.severity = severity || "success";
      state.toast.message = message || "";
    },

    hideToast: (state) => {
      state.toast.open = false;
    },

    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  showToast,
  hideToast,
  setDrawerOpen,
} = storeReducer.actions;
export default storeReducer.reducer;
