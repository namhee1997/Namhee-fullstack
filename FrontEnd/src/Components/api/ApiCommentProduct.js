import axios from './Axios';

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
        let res = await axiosJWT.get("/v1/comment-product/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getCommentProductById = async (accessToken, axiosJWT, id) => {
    try {
        let res = await axiosJWT.get(`/v1/comment-product/get-by-id/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res?.data;
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
        let res = await axiosJWT.delete(`/v1/comment-product/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log('remove commentProduct success');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}