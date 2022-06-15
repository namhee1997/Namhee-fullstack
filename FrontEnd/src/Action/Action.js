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