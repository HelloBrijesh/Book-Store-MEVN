import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

let accessToken;
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "refresh",
      {},
      {
        withCredentials: true,
      }
    );
    accessToken = response.data.access_token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      (error.response.data.message === "jwt expired" ||
        error.response.data.message === "accessToken Required")
    ) {
      originalRequest._retry = true;
      return refreshAccessToken().then(() => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      });
    }

    if (error.response.data.message === "Invalid Refresh Token") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
