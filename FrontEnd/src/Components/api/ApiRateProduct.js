import axios from './Axios';

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
        let res = await axiosJWT.get("/v1/rate-product/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getRatesProductById = async (accessToken, axiosJWT, id) => {
    try {
        let res = await axiosJWT.get(`/v1/rate-product/get-by-id/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res?.data;
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
        let res = await axiosJWT.delete(`/v1/rate-product/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log('remove ratesProduct success');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}