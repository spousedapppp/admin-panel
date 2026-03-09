import axiosClient from "../axiosClient";
import fileClient from '../fileClient'
import axios from "axios";

// Get dashboard statistics
export const getDashboard = async () => {
  const response = await axiosClient.get("admin/dashboard");
  return response.data;
};

// get new users
export const getNewUsers = async () => {
  const response = await axiosClient.get("admin/newusers");
  return response.data;
};

export const getChart = async () => {
  const response = await axiosClient.get("admin/earnings");
  return response.data;
};

export const getAllUsers = async ({ search, page, status, type }) => {
  const params = {};
  if (search) params.search = search;
  if (page) params.page = page;
  if (status) params.status = status;
  if (type) params.type = type;

  const response = await axiosClient.get("admin/allusers", { params });
  return response.data;
};

export const addNewUser = async (userData) => {
  const response = await axiosClient.post("admin/adduser", userData);
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axiosClient.get(`admin/user/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axiosClient.put(`/admin/editUser/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosClient.delete(`/admin/deleteuser/${userId}`);
  return response.data;
};

export const getAdminData = async () => {
  const response = await axiosClient.get("/admin/profile/me");
  return response.data;
};

export const updateProfile = async (data) => {
  // console.log([...data]);
  const response = await fileClient.put("/admin/editAdminProfile", data);
  return response.data;
};

export const changeAdminPassword = async (data) => {
  const response = await axiosClient.put("/admin/changeAdminPassword", data);
  return response;
};

// Transactions
export const getTransactions = async ({ search, page, limit, type }) => {
  const params = {};
  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (type) params.type = type;

  const response = await axiosClient.get("admin/transactions", { params });
  return response.data;
};

// Reports (blocked users)
export const getReports = async ({ search, page, limit }) => {
  const params = {};
  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const response = await axiosClient.get("admin/reports", { params });
  return response.data;
};

// Unblock user
export const unblockUser = async (blockId) => {
  const response = await axiosClient.delete(`/admin/unblock/${blockId}`);
  return response.data;
};

// Analytics
export const getAnalytics = async () => {
  const response = await axiosClient.get("admin/analytics");
  return response.data;
};

// Send notification
export const sendNotification = async ({ title, content }) => {
  const response = await axiosClient.post("admin/send-notification", { title, content });
  return response.data;
};
