import axios from "axios";
import router from "./router";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });
axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.request.use((request) => {
  if (request.url == "/user/signup") {
    request.withCredentials = false;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const status = err.response.status;
    switch (status) {
      case 401:
        router.push("/login");
        break;
      case 404:
      case 500:
        router.push(`/error/${status}`);
        break;
    }
    // if (err.response.status === 401) {
    //   router.push("/login");
    // }
    throw err;
  }
);

export default axiosInstance;
