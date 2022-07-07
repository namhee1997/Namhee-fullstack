import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewNews = async (news) => {
    try {
        let data = await axios.post("/v1/news/add-news", news);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllNews = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/news/get-all", {
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

export const getNewsById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/news/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateNews = async (data) => {
    try {
        let res = await axios.post("/v1/news/update-news", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteNews = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/news/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove news success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}