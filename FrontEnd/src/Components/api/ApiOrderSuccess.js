import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewOrderSuccess = async (orderSuccess) => {
    try {
        let data = await axios.post("/v1/order-success/add-orderSuccess", orderSuccess);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllOrderSuccess = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/order-success/get-all", {
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

export const getOrderSuccessById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/order-success/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateOrderSuccess = async (data) => {
    try {
        let res = await axios.post("/v1/order-success/update-orderSuccess", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteOrderSuccess = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/order-success/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove orderSuccess success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}