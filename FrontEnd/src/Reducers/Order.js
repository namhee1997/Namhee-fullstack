import * as ActionTypes from '../ActionTypes';

const init = {
    list: [
        {
            idOrder: 1, slugProduct: 'oppo-reno-78gb-128gb',
            title: 'OPPO Reno7 8GB-128GB', price: '9.590.000',
            sale: '500.000', cost: '10.190.000', userID: '1', paid: 'false'
        },
        {
            idOrder: 2, slugProduct: 'oppo-reno-78gb-128gb',
            title: 'OPPO Reno7 8GB-128GB', price: '9.590.000',
            sale: '500.000', cost: '10.190.000', userID: '1', paid: 'false'
        },
        {
            idOrder: 3, slugProduct: 'oppo-reno-78gb-128gb',
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
        case ActionTypes.REMOVE_ODER:
            let dataRemoveOrder = state.list.filter(e => e.idOrder !== action.payload);
            return {
                ...state,
                list: dataRemoveOrder
            }
        case ActionTypes.REMOVE_ODER_CUSTOM:
            let dataRemoveOrderCustom = state.dataAdd.filter(e => e.idOderCustom !== action.payload);
            return {
                ...state,
                dataAdd: dataRemoveOrderCustom
            }
        default:
            return state;
    }
}

export default Order;