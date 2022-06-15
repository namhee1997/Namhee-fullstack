import * as ActionTypes from '../ActionTypes';

const init = {
    list: [],
    data: [
        {
            title: 'Tặng SDP 300.000đ',
            slug: 1,
        },
        {
            title: 'Tặng mã giảm giá 300.000đ khi mua hàng tại website',
            slug: 2,
        },
    ]
}

const promotionList = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.PROMOTION_LIST:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload
                ]
            }

        default:
            return state;
    }
}

export default promotionList;