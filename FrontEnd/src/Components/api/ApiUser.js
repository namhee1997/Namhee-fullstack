import axios from './Axios';

export const addNewUser = async (user) => {
    try {
        let data = await axios.post("/v1/user/add-user", user);
        console.log(data, 'sau data');
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllUser = async (accessToken, axiosJWT) => {
    try {
        let res = await axiosJWT.get("/v1/user/get-all", {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res?.data;
    } catch (error) {
        console.log('data get all err');
        // return [];
    }
}

export const getUserById = async (accessToken, axiosJWT, id) => {
    try {
        let res = await axiosJWT.get(`/v1/user/get-by-id/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log(res?.data, 'sau res get user by id');

        return res?.data;
    } catch (error) {
        console.log('data get by id err');
        // return [];
    }
}

export const updateUser = async (data) => {
    try {
        let res = await axios.post("/v1/user/update-user", data);
        console.log(res, 'sau data api');
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteUser = async (accessToken, axiosJWT, id) => {
    try {
        let res = await axiosJWT.delete(`/v1/user/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log(res, 'sau data api delete');

        return 'success';
    } catch (error) {
        return 'fail';
    }
}