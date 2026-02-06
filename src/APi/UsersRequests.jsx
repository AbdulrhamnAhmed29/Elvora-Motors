import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Auth requests 
export const login = async (data) => {
    const login = await API.post('/login', data);
    return login.data.data;
}
export const registerUser = async (data) => {
    const register = await API.post('/register', data);
    return register.data.data
}
export const logoutUser = async () => {
    const res = await API.post('/logout');
    return res.data
}

// Users requests 
export const getUsers = async () => {
    const responseUser = await API.get('/user/show');
    return responseUser.data;
};

export const getUserById = async (id) => {
    const response = await API.get(`/user/show/${id}`);
    return response.data;
};
export const updateUser = async (id, data) => {
    const responseUpdate = await API.post(`/user/update/${id}`, data);
    return responseUpdate.data;
}
export const addNewUser = async (data) => {
    const newuser = await API.post(`/user/create`, data);
    return newuser.data
}
export const deleteUser = (id) => API.delete(`/user/delete/${id}`);

export const getStats = async () => {
    const response = await API.get('/user/dashboard/stats');
    return response.data.data;
};

export default API;