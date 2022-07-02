import axios from './Axios';

export const addNewSlidesCustom = async (slides) => {
    try {
        let data = await axios.post("/v1/slides/add-slides", slides);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllSlidesCustom = async (accessToken, axiosJWT) => {
    try {
        let res = await axiosJWT.get("/v1/slides/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err 2');
        return [];
    }
}

export const getSlidesCustomById = async (accessToken, axiosJWT, slug) => {
    try {
        let res = await axiosJWT.get(`/v1/slides/get-by-id/${slug}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res?.data;
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateSlidesCustom = async (data) => {
    try {
        let res = await axios.post("/v1/slides/update-slides", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteSlidesCustom = async (accessToken, axiosJWT, id) => {
    try {
        let res = await axiosJWT.delete(`/v1/slides/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log('remove slides success');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}