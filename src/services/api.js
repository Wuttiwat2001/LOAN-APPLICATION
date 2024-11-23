import axios from "axios";
import {
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "../constants/api";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.timeout = 10000;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (error.code === "ECONNABORTED") {
      return Promise.reject({
        code: NETWORK_TIMEOUT,
        message: NETWORK_TIMEOUT_MESSAGE,
      });
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error.response.data);
  }
);

export default api;
