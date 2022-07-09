import axios from "axios";
import jwtDecode from 'jwt-decode';


const instance = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "https://app-shop-namhee.herokuapp.com",
});

const refreshToken = async () => {
    try {
        const res = await instance.post('/v1/auth/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error, 'error');
    }
}
export const axiosJWT = (user, dispatch, stateSuccess, keyJwt = '') => {
    const createAxios = instance;
    createAxios.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwtDecode(keyJwt);
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                }
                localStorage.setItem('token', data.accessToken);
                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = `Bearer ${data.accessToken}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err)
        }
    )
    return createAxios;
}