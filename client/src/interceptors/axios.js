import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

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

// axios.defaults.baseURL = "http://localhost:8000/api/";

// let refresh = false;

// axios.interceptors.response.use(
//   (resp) => resp,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 && !refresh &&
//       (error.response.data.message === "jwt expired" ||
//         error.response.data.message === "Token Required") && !originalRequest._retry
//     ) {
//       refresh = true;
//       originalRequest._retry = true;

//       const { status, data } = await axios.post(
//         "http://localhost:5000/api/refresh",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       if (status === 200) {
//         console.log("data.access_token", data.access_token);
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.access_token}`;

//         originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

//         return axios(originalRequest);
//       }
//     }
//     refresh = false;
//     return Promise.reject(error.response);
//   }
// );
