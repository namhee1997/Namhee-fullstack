import * as ActionTypes from '../ActionTypes';

const init = {
    listSingle: [
        {
            variable: 'Đen',
            data: {
                avt: 'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816847409611807_oppo-reno7-z-den-3.jpg'
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
                installment: '0',
                sale: '500.000',
                price: '8.490.000',
                company: 'oppo',
                cost: '8.990.000',
                promotion: true,
                infophone: {
                    chip: 'Snapdragon 680',
                    screen: '6.4',
                    ram: '8',
                    memory: '128',
                },
            }
        },
        {
            variable: 'Bạc',
            data: {
                avt: 'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816815482886220_oppo-reno7-z-bac-1.jpg',
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816815482886220_oppo-reno7-z-bac-1.jpg',
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816845096624267_oppo-reno7-z-bac-3.jpg'
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
                installment: '0',
                sale: '500.000',
                price: '9.590.000',
                company: 'oppo',
                cost: '10.190.000',
                promotion: true,
                infophone: {
                    chip: 'Snapdragon 680',
                    screen: '6.4',
                    ram: '12',
                    memory: '128',
                },
            }
        }
    ],
    dataPhones: [
        {
            avt: 'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
            img: [
                'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816847409611807_oppo-reno7-z-den-3.jpg'
            ],
            title: 'OPPO Reno7 8GB-128GB',
            slug: 'oppo-reno-78gb-128gb',
            installment: '0',
            sale: '500.000',
            price: '8.490.000',
            company: 'oppo',
            cost: '8.990.000',
            promotion: true,
            variable: ['Đen', 'Bạc'],
            infophone: {
                chip: 'Snapdragon 680',
                screen: '6.4',
                ram: '8',
                memory: '128',
            },
        }
    ]
}

const infoPhone = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.INFO_PHONE:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}

export default infoPhone;