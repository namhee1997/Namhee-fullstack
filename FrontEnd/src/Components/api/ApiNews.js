import axios from './Axios';

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
        let res = await axiosJWT.get("/v1/news/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getNewsById = async (accessToken, axiosJWT, slug) => {
    try {
        let res = await axiosJWT.get(`/v1/news/get-by-id/${slug}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res?.data;
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
        let res = await axiosJWT.delete(`/v1/news/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log('remove news success');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}