import axios from "axios";

const blogApi = axios.create({
  baseURL: "https://blogbackend-hazel.vercel.app",
});

blogApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export default blogApi;
