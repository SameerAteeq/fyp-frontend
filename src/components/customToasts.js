// src/components/Toast.js
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import { hideToast } from "../store/reducer";

function TransitionLeft(props) {
  return <Slide {...props} direction="up" />;
}
const Toast = () => {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector(
    (state) => state.storeReducer.toast
  );

  (function () {
    setTimeout(() => {
      dispatch(hideToast());
    }, 5000);
  })();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={TransitionLeft}
      open={open}
      variant="filled"
      sx={{ width: "100%" }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
