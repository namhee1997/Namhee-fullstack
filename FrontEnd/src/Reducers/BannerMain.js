import * as ActionTypes from '../ActionTypes';

const init = {
    list: [
        { url: '/static/media/banner2.b496451f.webp', id: 321 },
        { url: '/static/media/banner2.b496451f.webp', id: 324 },
    ],
    data: [
    ]
}

const dataState = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.BANNER_MAIN:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}

export default dataState;