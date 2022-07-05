import axios from './Axios';

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
        let res = await axiosJWT.get("/v1/product/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getProductById = async (accessToken, axiosJWT, slug) => {
    try {
        let res = await axiosJWT.get(`/v1/product/get-by-id/${slug}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res?.data;
    } catch (error) {
        console.log('data get by id err');
    }
}

export const getProductRelater = async (accessToken, axiosJWT, slug, exculed) => {
    try {
        let res = await axiosJWT.get(`/v1/product/getproductrelater/${slug}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        let dataReturn = res?.data;
        let filter = dataReturn.filter(e => e.idPhone != exculed);

        return filter;
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
        let res = await axiosJWT.delete(`/v1/product/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log('remove product success');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}