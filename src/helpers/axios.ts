import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "../store";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const { auth } = store.getState();
  if (auth.user?.access_token) {
    req.headers.Authorization = `Bearer ${auth.user.access_token}`;
  }
  return req;
});

export default axiosInstance;
