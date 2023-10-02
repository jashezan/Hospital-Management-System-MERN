import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1";
const token = localStorage.getItem("token") || null;

export const fetchData = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});


export const fetchDataAuth = axios.create({
  baseURL: baseURL,
  timeout: 1000,  
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
