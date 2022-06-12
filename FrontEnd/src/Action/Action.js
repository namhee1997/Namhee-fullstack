import * as ActionTypes from '../ActionTypes';

export const bannerMain = (hobby) => {
    return {
        type: ActionTypes.BANNER_MAIN,
        payload: hobby
    }
}