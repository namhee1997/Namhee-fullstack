import * as ActionTypes from '../ActionTypes';

const init = {
    data: [
        {
            idPhone: 1,
            selected: {
                variable: 'Đen',
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
                installment: '0',
                sale: 500000,
                price: 9500000,
                company: 'oppo',
                cost: 10000000,
                promotion: true,
                promotionChoose: 1,
                paymentCart: 'vnp'
            },
            dataTotal: {
                promotionChoose: [
                    { title: 'Tặng SDP 300.000đ', slug: 1 },
                    { title: 'Tặng mã giảm giá 300.000đ khi mua hàng tại website', slug: 2 },
                ],
                totalSelect: [
                    {
                        variable: 'Đen',
                        data: {
                            title: 'OPPO Reno7 8GB-128GB',
                            slug: 'oppo-reno-78gb-128gb',
                            installment: '0',
                            sale: 500000,
                            price: 9500000,
                            company: 'oppo',
                            cost: 10000000,
                            promotion: true,
                        }
                    },
                    {
                        variable: 'Bạc',
                        data: {
                            title: 'OPPO Reno7 8GB-128GB',
                            slug: 'oppo-reno-78gb-128gb',
                            installment: '0',
                            sale: 500000,
                            price: 9590000,
                            company: 'oppo',
                            cost: 10190000,
                            promotion: true,
                        }
                    }
                ]
            }

        },
    ],
    checkChange: true,
}

const cart = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                checkChange: !state.checkChange,
                data: [
                    ...state.data,
                    action.payload
                ],
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