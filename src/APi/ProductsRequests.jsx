import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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



// ---------- Products (Admin) ----------
// get all products 
export const getProducts = async () => {
    const res = await API.get("/product/show");
    return res.data
};
// get one product 
export const getProductById = async (id) => (await API.get(`/product/showbyid/${id}`)).data;
// create product 
export const createProduct = async (formData) => {
    const res = await API.post("/product/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

// update product 
export const updateProduct = async (id, data) => (await API.post(`/product/update/${id}`, data)).data;

// delete product 
export const deleteProduct = async (id) => {
    return (await API.delete(`/product/delete/${id}`)).data;
};
export const getProductStats = async () => {
    const res = await API.get('/product/stats');
    return res.data;
};







