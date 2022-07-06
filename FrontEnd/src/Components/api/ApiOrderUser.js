import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewOrderUser = async (orderUser) => {
    try {
        let data = await axios.post("/v1/order-user/add-orderUser", orderUser);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllOrderUser = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/order-user/get-all", {
                headers: { token: `Bearer ${accessToken}` },
            });

            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getOrderUserById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/order-user/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateOrderUser = async (data) => {
    try {
        let res = await axios.post("/v1/order-user/update-orderUser", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteOrderUser = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/order-user/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove orderUser success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}