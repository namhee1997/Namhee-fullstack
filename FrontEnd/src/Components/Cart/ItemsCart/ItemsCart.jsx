import { useRef, useState } from "react";
import $ from 'jquery';

export default function ItemsCart({ e, i, productPrice, handleNumber }) {

    const selectVariable = useRef();
    const [onChangeOption, setOnchangeOption] = useState(false);

    const multilpeFunc = (i, z) => {
        handleNumber.setValueSendPayment({
            ...handleNumber.valueSendPayment,
            variable: selectVariable.current.value
        });

        for (let n = 0; n < (selectVariable.current.children).length; n++) {
            let number = $(selectVariable.current.children[n]).attr('number');
            let value = $(selectVariable.current.children[n]).val();
            if (selectVariable.current.value == value) {
                handleNumber.setNumberVariable(number);
                handleNumber.setNumberProduct(i);
            }
        }
        setOnchangeOption(true);
    }
    return (
        <div key={i} className='box_list_cart' >
            <div className="thumb_cart_product">
                <img src={e.selected.img[0]} alt="" />
            </div>
            <div className="content_product_cart">
                <div className="head_cart_product">
                    <div className="cart_head_left">
                        <h3>{e.selected.title}</h3>
                        <select name="variable" className="select_variable_cart" value={onChangeOption ? handleNumber.valueSendPayment.variable : e.selected.variable}
                            onChange={(m) => { multilpeFunc(i, m) }}
                            ref={selectVariable}
                        >
                            {
                                e.dataTotal.totalSelect.map((z, x) => {
                                    return (
                                        <option key={x} value={z.variable} number={x}>
                                            {z.variable}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <select name="promotionChoose" className="select_promotion_cart" value={e.selected.promotionChoose}
                            onChange={() => { }}
                        >
                            {
                                e.dataTotal.promotionChoose.map((z, x) => {
                                    return (
                                        <option key={x} value={z} >
                                            {z}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="cart_head_center">
                        <div className="cheose_total_produc">
                            <button>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <div className="total_product">
                                1
                            </div>
                            <button>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div className="remove_product">
                            <i className="fa-solid fa-trash-can"></i>
                            <p>Xóa</p>
                        </div>
                    </div>
                    <div className="cart_head_right">
                        <p>{!onChangeOption ? e.selected.cost : productPrice.cost}</p>
                        <span>{!onChangeOption ? e.selected.price : productPrice.price}</span>
                    </div>
                </div>
                <div className="payment_cart">
                    {
                        e.selected.paymentCart == 'vpn' ?
                            <div className="container_payment_cart">
                                <img src="https://fptshop.com.vn/Uploads/Originals/2021/3/15/637513980986241445_Logo-VNPAYQR-(1).jpg" alt="" />
                                <p>
                                    Thanh toán VNPAY
                                </p>
                            </div>
                            : <div className="container_payment_cart">
                                <img src="https://fptshop.com.vn/Uploads/Originals/2020/12/4/637426739557050119_logo-moca.png" alt="" />
                                <p>
                                    Thanh toán ví Moca trên ứng dụng Grab
                                </p>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
}