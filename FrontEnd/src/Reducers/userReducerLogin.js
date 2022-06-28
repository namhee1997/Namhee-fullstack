import * as ActionTypes from '../ActionTypes';

const initialState = {
    userLogin: {},
    allUsers: [],
    jwt: '',
}

const appReducerLogin = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLogin: action.payload
            }

        case ActionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                userLogin: {},
            }
        case ActionTypes.USER_LOGIN_SUCCESS_DASHBOARD:
            return {
                ...state,
                isAdmin: true,
                adminInfo: action.adminInfo
            }
        case ActionTypes.SET_ALL_USER:
            return {
                ...state,
                allUsers: action.payload
            }
        case ActionTypes.SET_JWT_TO_REDUX:
            return {
                ...state,
                jwt: action.payload
            }
        default:
            return state;
    }
}

export default appReducerLogin;