import * as ActionTypes from '../ActionTypes';
import Apple from '../assets/img/apple.png';
import Samsung from '../assets/img/samsung.png';
import Vivo from '../assets/img/vivo.png';
import Nokia from '../assets/img/nokia.png';

const init = {
    list: [
        { src: Samsung, title: 'Samsung', slug: 'samsung' },
        { src: Vivo, title: 'Vivo', slug: 'vivo' },
        { src: Apple, title: 'Apple', slug: 'apple' },
        { src: Nokia, title: 'Nokia', slug: 'nokia' }
    ],
    data: [
    ]
}

const Company = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.COMPANY_LIST:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}

export default Company;