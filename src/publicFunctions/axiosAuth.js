import axios from "axios";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("jwt")
    config.headers.Authorization =  token;
     
    return config;
});

export default axios