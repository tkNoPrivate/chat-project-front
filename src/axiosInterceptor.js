import axios from "axios";
import router from "./router";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });
axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.request.use(function (request) {
  if (request.url == "/user/signup") {
    request.withCredentials = false;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (e) {
    if(e.response.status === 401){
      router.push("/login");
    }
    throw e;
  }
);

export default axiosInstance;
