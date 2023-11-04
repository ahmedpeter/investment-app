import axios from "axios";
//   import Router from "next/router";
  
  const API_URL = "process.env.NEXT_PUBLIC_ENDPOINT_AUTH";
  
  const onRequest = (config) => {
    const accessToken = localStorage.getItem("accessToken"); 
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    console.log(config);
    return config;
  };
  
  const onRequestError = (error) => {
    return Promise.reject(error);
    console.log('i am here')
  };
  
  const onResponse = (response) => {
    return response;
  };
  
  const onResponseError = async (error) => {
    if (error.response) {
      // Access Token was expired
      if (
        error.response.status === 401 &&
        error.response.data.message === "jwt expired"
      ) {
        const storedToken = JSON.parse(localStorage.getItem("accessToken"));
  
        try {
          const res = await axios.post(`${API_URL}/token`, {
            refreshToken: storedToken.refreshToken,
          });
  
          const { userToken, user } = res.data;
          localStorage.setItem("token", JSON.stringify(userToken));
          localStorage.setItem("user", JSON.stringify(user));
  
          return;
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  };
  
  export const setupInterceptorsTo = ( axiosInstance ) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  };