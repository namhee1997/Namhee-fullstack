import * as ActionTypes from '../ActionTypes';

const init = {
    list: [],
    data: [
        {
            img: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/4/25/637864982144816513_iphone-13-pro-max-dd-2-128-256-512-1tb.jpg',
            title: 'iPhone 13 Pro Max 128GB',
            slug: 'iphone13promax128gb',
            installment: '0',
            company: 'apple',
            sale: 3500000,
            price: 30490000,
            cost: 33990000,
            promotion: true,
            infophone: {
                chip: 'Apple A15 Bionic',
                screen: '	6.7',
                ram: '6',
                memory: '128',
            },

        },
        {
            img: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/6/637874460472027520_oppo-reno7-4g-dd-2.jpg',
            title: 'OPPO Reno7 8GB-128GB',
            slug: 'opporeno78gb-128gb',
            installment: '0',
            sale: 500000,
            price: 8490000,
            company: 'oppo',
            cost: 8990000,
            promotion: true,
            infophone: {
                chip: 'Snapdragon 680',
                screen: '6.4',
                ram: '8',
                memory: '128',
            },
        },
        {
            img: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/6/637770599598131041_samsung-galaxy-m52-g-xanh-dd.jpg',
            title: 'Samsung Galaxy M52 5G',
            slug: 'samsunggalaxym525gb',
            installment: null,
            sale: 2000000,
            company: 'samsung',
            price: 7690000,
            cost: 9690000,
            promotion: true,
            infophone: {
                chip: 'Snapdragon 778G',
                screen: '6.7',
                ram: '8',
                memory: '128',
            },
        },
        {
            img: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg',
            title: 'iPhone 12 64GB',
            slug: 'iphone1262gb',
            installment: '0',
            sale: 2500000,
            company: 'apple',
            price: 17499000,
            cost: 19999000,
            promotion: false,
            infophone: {
                chip: 'Apple A14 Bionic',
                screen: '6.1',
                ram: '4',
                memory: '64',
            },
        },
        {
            img: 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/25/637707822857432352_00779950-vivo-y15s-trang-xanh-dd.jpg',
            title: 'Vivo Y15s 3GB - 32GB',
            installment: '0',
            slug: 'vivoy15s3gb-32gb',
            sale: 300000,
            price: 3190000,
            company: 'vivo',
            cost: 3490000,
            promotion: false,
            infophone: {
                chip: '	Helio P35',
                screen: '6.51',
                ram: '3',
                memory: '32',
            },
        },
    ]
}

const dataState = (state = init, action) => {

    switch (action.type) {
        case ActionTypes.DATA_STATE:
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

export default dataState;