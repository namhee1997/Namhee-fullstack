import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewProduct = async (product) => {
    try {
        let data = await axios.post("/v1/product/add-product", product);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllProduct = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/product/get-all", {
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

export const getProductById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/product/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const getProductRelater = async (accessToken, axiosJWT, slug, exculed) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/product/getproductrelater/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });

            if (exculed) {
                let dataReturn = res?.data;
                let filter = dataReturn.filter(e => e.idPhone != exculed);

                return filter;
            } else {
                return res?.data;
            }
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data relater get by id err');
    }
}

export const updateProduct = async (data) => {
    try {
        let res = await axios.post("/v1/product/update-product", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteProduct = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/product/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove product success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}