import axios from "axios";
import { HOSTNAME } from "./config";

import { getToken } from "./redux/slices/userSlice";

const fileClient = axios.create({
    baseURL: HOSTNAME,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Add a request interceptor to pass the token with each request
fileClient.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if( token ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default fileClient;