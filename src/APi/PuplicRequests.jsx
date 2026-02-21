import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_API_URL;
const API = axios.create({
    baseURL: baseURL,
    headers: { 'Accept': 'application/json' }
});

API.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const publicAPI = axios.create({
    baseURL: baseURL,
    headers: { 'Accept': 'application/json' }
});


export const getProductsToUsers = async () => {
    const res = await publicAPI.get("/products"); 
    return res.data;
}

export const getProductDetails = async (id) => (await publicAPI.get(`/products/${id}`)).data;



