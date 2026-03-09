import axiosClient from "../axiosClient";


// restaurant login API
export const LoginApi = async (data) => {
    const response = await axiosClient.post("auth/login", data);
    return response.data;
};
