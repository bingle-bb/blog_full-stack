import axios from "axios";

const blogApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default blogApi;
