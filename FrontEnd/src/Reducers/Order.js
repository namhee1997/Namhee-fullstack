import * as ActionTypes from '../ActionTypes';
import Apple from '../assets/img/apple.png';
import Samsung from '../assets/img/samsung.png';
import Vivo from '../assets/img/vivo.png';
import Nokia from '../assets/img/nokia.png';

const init = {
    list: [
        {
            idOrder: 1, slugProduct: 'oppo-reno-78gb-128gb',
            title: 'OPPO Reno7 8GB-128GB', price: '9.590.000',
            sale: '500.000', cost: '10.190.000', userID: '1', paid: 'false'
        },

    ],
    data: [
    ]
}

const Order = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.ORDER_LIST:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}

export default Order;