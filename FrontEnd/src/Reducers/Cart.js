import * as ActionTypes from '../ActionTypes';
import { updateCart } from '../Pages/api/ApiCart';

const init = {
    data: [

    ],
    checkChange: true,
}

const cart = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            let dataStateAdd = state.data;
            let dataAction = action.payload;
            let indexPosition = dataStateAdd.findIndex(e => e.idPhone == dataAction.idPhone);
            let indexState = dataStateAdd.some(e => e.idPhone == dataAction.idPhone);
            console.log(action.payload, 'action.payload');

            if (indexState) {
                dataStateAdd[indexPosition].totalCurrent = dataStateAdd[indexPosition].totalCurrent + 1;
                let dataUpdate = dataStateAdd[indexPosition];
                const fetchUpdateCart = async () => {
                    try {
                        let data = await updateCart(dataUpdate);
                        console.log('update cart success', data);
                    } catch (error) {
                        console.log('update cart err 1');
                    }
                }
                // fetchUpdateCart();

                return {
                    ...state,
                    checkChange: !state.checkChange,
                    data: dataStateAdd,
                }
            } else {
                return {
                    ...state,
                    checkChange: !state.checkChange,
                    data: [
                        ...state.data,
                        action.payload
                    ],
                }
            }

        case ActionTypes.REMOVE_TO_CART:
            let dataState = state.data.filter(function (z) {
                return z.idPhone != action.payload;
            });

            console.log(dataState, 'action');
            return {
                ...state,
                checkChange: !state.checkChange,
                data: dataState
            }

        default:
            return state;
    }
}

export default cart;