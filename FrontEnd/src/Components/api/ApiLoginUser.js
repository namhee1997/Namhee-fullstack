import axios from './Axios';
import { loginSuccess, loginFail, logOut, registerUser, registerUserFail, loginSuccessDashBoard } from '../../Action/Action';

export const loginUser = async (user, dispatch, navigate, dashBoard = false) => {
    try {
        // const res = await axios.post("/v1/auth/login", user);
        // dispatch(loginSuccess(res.data));
        let data = '';
        dispatch(loginSuccess(user));

        if (!dashBoard) {
            data = 'eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VybmFtZSI6IkpheWNlIiwicm9sZSI6InVzZXIiLCJmdWxsbmFtZSI6Im5ndXllbiB2YW4gYSIsImF2YXRhciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R1bmdkdi9pbWFnZS91cGxvYWQvdjE2NTI3NTM4NjQvY2NvaGtsN2d3cm5hanM4cWd0ZmkucG5nIiwiYWRkcmVzcyI6InZpbmggbmdoZSBhbiIsImVtYWlsIjoibnVuYWwwODg5QGdtYWlsLmNvbSIsInBob25lIjoiMDk2ODc5NjI5MyIsInVzZXJJZCI6IjEiLCJpc0Rhc2hCb2FyZCI6ZmFsc2V9.jRtbMoG1AF2tiw7G6IM9QMsdHzWToYQyQSUqlNFq244';
            return data;
        } else {
            data = 'eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VybmFtZSI6IkpheWNlIiwicm9sZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJuZ3V5ZW4gdmFuIGEiLCJhdmF0YXIiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kdW5nZHYvaW1hZ2UvdXBsb2FkL3YxNjUyNzUzODY0L2Njb2hrbDdnd3JuYWpzOHFndGZpLnBuZyIsImFkZHJlc3MiOiJ2aW5oIG5naGUgYW4iLCJlbWFpbCI6Im51bmFsMDg4OUBnbWFpbC5jb20iLCJwaG9uZSI6IjA5Njg3OTYyOTMiLCJ1c2VySWQiOiIxIiwiaXNEYXNoQm9hcmQiOnRydWV9.15q01jR3XRzdSILNWa3z1gQCvBw7K0mcoxNB-LwjEUs';
            return data;
        }
        // navigate('/');
    } catch (error) {
        dispatch(loginFail());
    }
}

export const registerUserApi = async (user, dispatch, navigate) => {
    try {
        // await axios.post("/v1/auth/register", user);
        dispatch(registerUser());
        return 'success';
    } catch (error) {
        dispatch(registerUserFail());
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
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}