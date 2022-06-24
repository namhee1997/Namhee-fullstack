import axios from './Axios';
import { loginSuccess, loginFail, logOut, registerUser, registerUserFail, loginSuccessDashBoard } from '../../Action/Action';

export const loginUser = async (user, dispatch, navigate) => {
    try {
        // const res = await axios.post("/v1/auth/login", user);
        // dispatch(loginSuccess(res.data));
        dispatch(loginSuccess(user.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFail());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    try {
        await axios.post("/v1/auth/register", user);
        dispatch(registerUser());
        navigate('/login');
    } catch (error) {
        dispatch(registerUserFail());
    }
}

export const logOut = async (dispatch, id, navigate, token, axiosJWT) => {
    try {
        await axios.post("/v1/auth/logout", id);
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
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}