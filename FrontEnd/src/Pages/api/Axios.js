import axios from 'axios';

const instance = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "https://app-shop-namhee.herokuapp.com",
});

export default instance;