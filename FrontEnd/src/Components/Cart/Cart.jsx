import { useEffect, useState } from "react";
import ItemsCart from "./ItemsCart/ItemsCart";

export default function Cart() {


    const [listProduct, setListProduct] = useState([

        {
            selected: {
                variable: 'Đen',
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
                installment: '0',
                sale: '500.000',
                price: '8.490.000',
                company: 'oppo',
                cost: '8.990.000',
                promotion: true,
                promotionChoose: 'Tặng SDP 300.000đ',
                paymentCart: 'vnp'
            },
            dataTotal: {
                promotionChoose: [
                    'Tặng SDP 300.000đ',
                    'Tặng mã giảm giá 300.000đ khi mua hàng tại website'
                ],
                totalSelect: [
                    {
                        variable: 'Đen',
                        data: {
                            title: 'OPPO Reno7 8GB-128GB',
                            slug: 'oppo-reno-78gb-128gb',
                            installment: '0',
                            sale: '500.000',
                            price: '8.490.000',
                            company: 'oppo',
                            cost: '8.990.000',
                            promotion: true,
                        }
                    },
                    {
                        variable: 'Bạc',
                        data: {
                            title: 'OPPO Reno7 8GB-128GB',
                            slug: 'oppo-reno-78gb-128gb',
                            installment: '0',
                            sale: '500.000',
                            price: '9.590.000',
                            company: 'oppo',
                            cost: '10.190.000',
                            promotion: true,
                        }
                    }
                ]
            }

        },

    ]);

    const [numberProduct, setNumberProduct] = useState(null);
    const [numberVariable, setNumberVariable] = useState(null);
    const [valueSendPayment, setValueSendPayment] = useState({
        price: '',
        variable: '',
        promotionChoose: '',
        paymentCart: '',
    });

    let handleNumber = {
        numberProduct,
        numberVariable,
        valueSendPayment,
        setNumberProduct,
        setNumberVariable,
        setValueSendPayment,
    }

    const [productPrice, setProductPrice] = useState({
        cost: listProduct[numberProduct || 0].selected.cost,
        price: listProduct[numberProduct || 0].selected.price
    });

    useEffect(() => {
        setProductPrice({
            cost: listProduct[numberProduct || 0].dataTotal.totalSelect[+numberVariable || 0].data.cost,
            price: listProduct[numberProduct || 0].dataTotal.totalSelect[+numberVariable || 0].data.price,
        });
        setValueSendPayment({
            ...valueSendPayment,
            price: productPrice.cost
        });
    }, [numberProduct, numberVariable])




    return (
        <div className="cart_box">
            <div className="container_cart box_shadow">
                <h2>Có {listProduct.length} sản phẩm trong giỏ hàng</h2>
                <ul className="list_product_cart">
                    {
                        listProduct.map((e, i) => {
                            return (
                                <li key={i}>
                                    <ItemsCart e={e} i={i} productPrice={productPrice} handleNumber={handleNumber} />
                                </li>
                            );
                        })
                    }

                </ul>
                <div className="discount_code">
                    <div className="discount_left">
                        <h4>Mã giảm giá</h4>
                        <div className="box_input_discount">
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                    </div>
                    <div className="discount_right">
                        <div className="box_price_discount">
                            <p>Tổng tiền: </p>
                            <span>{listProduct[0].selected.cost}</span>
                        </div>
                        <div className="box_price_discount">
                            <p>Giảm: </p>
                            <span>{listProduct[0].selected.sale}</span>
                        </div>
                        <div className="box_price_discount total">
                            <p>Cần thanh toán: </p>
                            <span>{listProduct[0].selected.price}</span>
                        </div>
                    </div>
                </div>
                <div className="info_user_cart">
                    <div className="container_user_cart">
                        <div className="box_user_cart gender">
                            <div className="box_lex">
                                <input type="radio" id="male" name="sex" selected />
                                <label htmlFor="male">Anh</label>
                            </div>
                            <div className="box_lex">
                                <input type="radio" id="female" name="sex" />
                                <label htmlFor="male">Chị</label>
                            </div>
                        </div>
                        <div className="box_user_cart name">
                            <div className="colum_">
                                <input type="text" placeholder="Nhập họ và tên" />
                                <input type="text" placeholder="Nhập số điện thoại" />
                            </div>
                        </div>
                        <div className="box_user_cart email">
                            <input type="email" placeholder="Nhập email" />
                        </div>
                    </div>
                </div>
                <div className="btn_submit">
                    <button>Hoàn tất đặt hàng</button>
                    <p>Bằng cách đặt hàng, bạn đồng ý với điểu khoản của Shop</p>
                </div>
            </div>
        </div>
    );
}