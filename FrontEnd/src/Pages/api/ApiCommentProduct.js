import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewCommentProduct = async (commentProduct) => {
    try {
        let data = await axios.post("/v1/comment-product/add-comment", commentProduct);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllCommentProduct = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/comment-product/get-all", {
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

export const getCommentProductById = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/comment-product/get-by-id/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateCommentProduct = async (data) => {
    try {
        let res = await axios.post("/v1/comment-product/update-comment", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteCommentProduct = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/comment-product/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove commentProduct success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}