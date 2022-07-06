import axios from './Axios';
import jwtDecode from 'jwt-decode';

export const addNewCompany = async (company) => {
    try {
        let data = await axios.post("/v1/company/add-company", company);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const getAllCompany = async (accessToken, axiosJWT) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get("/v1/company/get-all", {
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

export const getCompanyById = async (accessToken, axiosJWT, slug) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.get(`/v1/company/get-by-id/${slug}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res?.data;
        }
        return 'tokenEXP';
    } catch (error) {
        console.log('data get by id err');
    }
}

export const updateCompany = async (data) => {
    try {
        let res = await axios.post("/v1/company/update-company", data);
        return 'success';
    } catch (error) {
        return 'fail';
    }
}

export const deleteCompany = async (accessToken, axiosJWT, id) => {
    try {
        let date = new Date();
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp > date.getTime() / 1000) {
            let res = await axiosJWT.delete(`/v1/company/delete/${id}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            console.log('remove company success');

            return 'success';
        }
        return 'tokenEXP';
    } catch (error) {
        return 'fail';
    }
}