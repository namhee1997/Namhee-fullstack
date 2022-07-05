import { useRef, useState, useEffect } from "react";
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

    const handleChangPromotion = (i, z) => {
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

    //CHANGE PRICE
    const [productPrices, setProductPrices] = useState({
        cost: 0,
        price: 0
    });
    const [totalProduct, setTotalProduct] = useState(e.totalCurrent || 1);

    useEffect(() => {
        setProductPrices({
            cost: e?.dataTotal?.totalSelect[+handleNumber.numberVariable || 0]?.data?.cost * totalProduct || 0,
            price: e?.dataTotal?.totalSelect[+handleNumber.numberVariable || 0]?.data?.price * totalProduct || 0,
        });
        setTimeout(() => {
            handleNumber.setProductPrice(z => {
                let data = [...z];
                let objIndex = data.findIndex((obj => obj.title == `p${i + 1}`));
                data[objIndex].cost = e?.dataTotal?.totalSelect[+handleNumber?.numberVariable || 0]?.data?.cost * totalProduct || 0;
                data[objIndex].price = e?.dataTotal?.totalSelect[+handleNumber?.numberVariable || 0]?.data?.price * totalProduct || 0;

                return data;
            });
        }, 500);

    }, [handleNumber.numberProduct, handleNumber.numberVariable, totalProduct, e])
    //END CHANGE PRICE

    return (
        <div key={i} className='box_list_cart' >
            <div className="thumb_cart_product">
                <img src={(e?.selected?.listimg || []).length > 0 ? e?.selected?.listimg[0].thumb : ''} alt="" />
            </div>
            <div className="content_product_cart">
                <div className="head_cart_product">
                    <div className="cart_head_left">
                        <h3>{e?.selected?.title}</h3>
                        <select name="variable" className={`select_variable_cart select_variable_${i}`} value={onChangeOption ? handleNumber.valueSendPayment.variable : e?.selected?.variable}
                            onChange={(m) => { multilpeFunc(i, m) }}
                            ref={selectVariable}
                        >
                            {
                                e?.dataTotal?.totalSelect?.map((z, x) => {
                                    return (
                                        <option key={x} value={z.variable} number={x}>
                                            {z.variable}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        {
                            e?.dataTotal?.promotionChoose?.map((z, x) => {
                                let data = '';
                                if (e.selected.promotionChoose == z.slug) {
                                    data = z.title;
                                }
                                return (
                                    <div className="box_promotion" key={x}>
                                        <p>{data}</p>
                                    </div>
                                );
                            })
                        }

                    </div>
                    <div className="cart_head_center">
                        <div className={`cheose_total_produc total_product${i}`}>
                            <button onClick={() => setTotalProduct(e => e <= 1 ? 1 : e - 1)}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <div className="total_product">
                                {totalProduct}
                            </div>
                            <button onClick={() => setTotalProduct(e => e + 1)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div className="remove_product" onClick={() => handleNumber.handleRemoveProduct(e.idPhone)}>
                            <i className="fa-solid fa-trash-can"></i>
                            <p>Xóa</p>
                        </div>
                    </div>
                    <div className="cart_head_right">
                        {/* <p>{!onChangeOption ? e.selected.price * productPrices.price : productPrice.price}</p>
                        <span>{!onChangeOption ? e.selected.cost * productPrices.cost : productPrice.cost}</span> */}
                        <p>{productPrices.price}</p>
                        <span>{productPrices.cost}</span>
                    </div>
                </div>
                <div className="payment_cart">
                    {
                        e?.selected?.paymentCart == 'vpn' ?
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