import axios from "axios";

const token = localStorage.getItem("token");
const

  axiosInstance = axios.create({
  baseURL: "https://api.ppr.vchdqarshi.uz/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
