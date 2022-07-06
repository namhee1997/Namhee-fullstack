import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewRatesProduct = async (ratesProduct) => {
    try {
        let data = await axios.post("/v1/rate-product/add-rates", ratesProduct);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllRatesProduct = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/rate-product/get-all", {
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

export const getRatesProductById = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/rate-product/get-by-id/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateRatesProduct = async (data) => {
    try {
        let res = await axios.post("/v1/rate-product/update-rates", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteRatesProduct = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/rate-product/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove ratesProduct success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}