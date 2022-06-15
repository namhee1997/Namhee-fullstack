import * as ActionTypes from '../ActionTypes';

const init = {
    list: [
        {
            idOrder: 1, slugProduct: 'oppo-reno-78gb-128gb',
            title: 'OPPO Reno7 8GB-128GB', price: '9.590.000',
            sale: '500.000', cost: '10.190.000', userID: '1', paid: 'false'
        },

    ],
    dataAdd: [
    ]
}

const Order = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.ORDER_LIST:
            return {
                ...state,
                list: action.payload
            }
        case ActionTypes.ORDER_ADD:
            return {
                ...state,
                dataAdd: [
                    ...state.dataAdd,
                    action.payload
                ]
            }
        default:
            return state;
    }
}

export default Order;