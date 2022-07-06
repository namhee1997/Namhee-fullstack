import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewUser = async (user) => {
    try {
        let data = await axios.post("/v1/user/add-user", user);
        console.log(data, 'sau data');
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllUser = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/user/get-all", {
                headers: { token: `Bearer ${accessToken}` },
            });

            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get all err');
        return [];
    }
}

export const getUserById = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/user/get-by-id/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });

            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateUser = async (data) => {
    try {
        let res = await axios.post("/v1/user/update-user", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteUser = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/user/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}