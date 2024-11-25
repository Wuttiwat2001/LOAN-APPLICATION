export const apiUrl = "http://localhost:8080/api";

export const server = {
  LOGIN_URL: `auth/login`,
  REGISTER_URL: `auth/signup`,
  TRANSACTION_URL: `transactions`,
  USER_URL: `users`,
  REQUEST_URL: `requests`,
};

export const SUCCESS = "SUCCESS"
export const ACCESS_TOKEN = "ACCESS_TOKEN"
export const USER ="USER"

export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";

export const NETWORK_TIMEOUT = "NETWORK_TIMEOUT";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
