import * as ActionTypes from '../ActionTypes';

export const bannerMain = (hobby) => {
    return {
        type: ActionTypes.BANNER_MAIN,
        payload: hobby
    }
}

export const addOrder = (hobby) => {
    return {
        type: ActionTypes.ORDER_ADD,
        payload: hobby
    }
}

export const removeOrder = (hobby) => {
    return {
        type: ActionTypes.REMOVE_ODER,
        payload: hobby
    }
}

export const removeOrderCustom = (hobby) => {
    return {
        type: ActionTypes.REMOVE_ODER_CUSTOM,
        payload: hobby
    }
}

export const removeProductCart = (hobby) => {
    return {
        type: ActionTypes.REMOVE_TO_CART,
        payload: hobby
    }
}

export const addToCart = (hobby) => {
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: hobby
    }
}

//LOGIN
export const loginSuccess = (hobby) => {
    return {
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: hobby
    }
}

export const logOut = (hobby) => {
    return {
        type: ActionTypes.PROCESS_LOGOUT,
        payload: hobby
    }
}

export const loginSuccessDashBoard = (hobby) => {
    return {
        type: ActionTypes.USER_LOGIN_SUCCESS_DASHBOARD,
        adminInfo: hobby
    }
}


export const setAllUser = (hobby) => {
    return {
        type: ActionTypes.SET_ALL_USER,
        payload: hobby
    }
}

export const setJWT = (hobby) => {
    return {
        type: ActionTypes.SET_JWT_TO_REDUX,
        payload: hobby
    }
}

export const emptyCart = (hobby) => {
    return {
        type: ActionTypes.EMPTY_CART,
        payload: hobby
    }
}


//END LOGIN
