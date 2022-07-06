import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewCart = async (cart) => {
    try {
        let data = await axios.post("/v1/cart/add-cart", cart);
        return data.data;
    } catch (error) {
        return 'fail';
    }
}

export const getAllCart = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/cart/get-all", {
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

export const getCartById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/cart/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateCart = async (data) => {
    try {
        let res = await axios.post("/v1/cart/update-cart", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteCart = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/cart/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove cart success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}

export const deleteAllCart = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/cart/delete-all/`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove all cart success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}