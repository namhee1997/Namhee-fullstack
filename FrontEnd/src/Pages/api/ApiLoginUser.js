import axios from './Axios';
import jwtDecode from 'jwt-decode';

import { loginSuccess, logOut, loginSuccessDashBoard } from '../../Action/Action';

export const loginUser = async (user, dispatch, navigate, dashBoard = false) => {


    return await axios.post("/v1/auth/login", user).then((e) => {
        let token = e.data.accessToken;
        loginSuccess(jwtDecode(token));
        return token;
    }).catch((e) => {
        return '';
    })

}

export const registerUserApi = async (user, dispatch, navigate) => {
    try {
        let data = await axios.post("/v1/auth/register", user);
        console.log(data, 'data register');
        return data.data;
    } catch (error) {
        return 'fail';
    }
}


export const logOutApi = async (dispatch, id, navigate, token, axiosJWT) => {
    try {
        // await axios.post("/v1/auth/logout", id);
        localStorage.setItem('token', '')
        dispatch(logOut());
        navigate('/login');
    } catch (error) {
        console.log(error);
    }
}

export const loginUserDashBoard = async (user, dispatch, navigate) => {
    try {
        // const res = await axios.post("/v1/auth/login", user);
        // dispatch(loginSuccessDashBoard(res.data));
        dispatch(loginSuccessDashBoard(user.data));
        // navigate('/');
    } catch (error) {
        console.log(error);
    }
}