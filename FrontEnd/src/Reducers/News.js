import * as ActionTypes from '../ActionTypes';
import Apple from '../assets/img/apple.png';
import Samsung from '../assets/img/samsung.png';
import Vivo from '../assets/img/vivo.png';
import Nokia from '../assets/img/nokia.png';

const init = {
    list: [
        { content: '', title: 'OPPO Reno7 8GB-128GB', slug: 'oppo-reno-78gb-128gb', urlTo: '/product/oppo-reno-78gb-128gb' },

    ],
    data: [
    ]
}

const News = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.NEWS_LIST:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}

export default News;