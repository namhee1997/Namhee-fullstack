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