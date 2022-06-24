import * as ActionTypes from '../ActionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    adminInfo: null,
    isAdmin: false,
}

const appReducerLogin = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case ActionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case ActionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case ActionTypes.USER_LOGIN_SUCCESS_DASHBOARD:
            return {
                ...state,
                isAdmin: true,
                adminInfo: action.adminInfo
            }
        default:
            return state;
    }
}

export default appReducerLogin;