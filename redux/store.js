import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import newUserReducer from "./slices/newUserSlice";
import deleteUserReducer from "./slices/deleteUserSlice";
import editUserReducer from "./slices/editUserSlice";
import cancelSubReducer from "./slices/cancelSubSlice";
import notificationReducer from "./slices/notificationSlice";
import cardReducer from "./slices/cardsSlice";
import chartReducer from "./slices/chartSlice";
import usersReducer from "./slices/allUsersSlice";
import userReducer from "./slices/getUserSlice";
import loggedInUserReducer from "./slices/loggedInUser";
import adminProfileReducer from "./slices/updateAdminSlice";
import viewUserReducer from "./slices/viewUserSlice";
import transactionsReducer from "./slices/transactionsSlice";
import reportsReducer from "./slices/reportsSlice";
import analyticsReducer from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    newUser: newUserReducer,
    deleteUser: deleteUserReducer,
    editUser: editUserReducer,
    viewUser: viewUserReducer,
    cancelSub: cancelSubReducer,
    notification: notificationReducer,
    card: cardReducer,
    chart: chartReducer,
    users: usersReducer,
    user: userReducer,
    loggedInUser: loggedInUserReducer,
    adminProfile: adminProfileReducer,
    transactions: transactionsReducer,
    reports: reportsReducer,
    analytics: analyticsReducer,
  },
});
