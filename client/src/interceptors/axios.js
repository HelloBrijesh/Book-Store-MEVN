import axios from "axios";
import { jwtDecode } from "jwt-decode";

// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// export const axiosAuthInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_SERVER_URL}`,
// });
export const axiosAuthInstance = axios.create();

axiosAuthInstance.interceptors.request.use(
  async (request) => {
    if (!request.headers.Authorization) {
      try {
        const response = await axios.get(`/api/refresh`, {
          withCredentials: true,
        });
        request.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        axiosAuthInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        return request;
      } catch (error) {
        if (error.response.data.message === "Invalid Refresh Token") {
          try {
            const response = await axios.put(
              `/api/logout`,
              {},
              {
                withCredentials: true,
              }
            );
          } catch (err) {
            console.log(err);
          }
          delete axiosAuthInstance.defaults.headers.common["Authorization"];
          let currentState = JSON.parse(localStorage.getItem("state"));
          currentState.authStore = {
            isAdmin: false,
            isLoggedin: false,
            userImage: "",
          };
          currentState.cartStore = {
            cartItems: [],
            cartTotal: 0,
            totalItems: 0,
          };
          localStorage.setItem("state", JSON.stringify(currentState));
          window.location = "/";
        }
      }
      return request;
    }
    if (request.headers.Authorization) {
      const accessToken = request.headers.Authorization.split(" ")[1];
      const decodedToken = jwtDecode(accessToken);
      let currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get(`/api/refresh`, {
            withCredentials: true,
          });
          request.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          axiosAuthInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          return request;
        } catch (error) {
          if (error.response.data.message === "Invalid Refresh Token") {
            try {
              const response = await axios.put(
                `/api/logout`,
                {},
                {
                  withCredentials: true,
                }
              );
            } catch (err) {
              console.log(err);
            }

            delete axiosAuthInstance.defaults.headers.common["Authorization"];
            let currentState = JSON.parse(localStorage.getItem("state"));
            currentState.authStore = {
              isAdmin: false,
              isLoggedin: false,
              userImage: "",
            };
            currentState.cartStore = {
              cartItems: [],
              cartTotal: 0,
              totalItems: 0,
            };
            localStorage.setItem("state", JSON.stringify(currentState));
            window.location = "/";
          }
        }
      }
      return request;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.data.message === "Invalid Access Token") {
      try {
        const response = await axios.put(
          `/api/logout`,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
      delete axiosAuthInstance.defaults.headers.common["Authorization"];
      let currentState = JSON.parse(localStorage.getItem("state"));
      currentState.authStore = {
        isAdmin: false,
        isLoggedin: false,
        userImage: "",
      };
      currentState.cartStore = {
        cartItems: [],
        cartTotal: 0,
        totalItems: 0,
      };
      localStorage.setItem("state", JSON.stringify(currentState));
      window.location = "/";
    }
    return Promise.reject(error);
  }
);
