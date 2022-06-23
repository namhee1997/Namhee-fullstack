import { useEffect, useState } from "react";
import ItemsCart from "./ItemsCart/ItemsCart";
import { useStore, useDispatch } from "react-redux";
import { removeProductCart } from "../../Action/Action";
import $ from 'jquery';

export default function Cart() {
    const store = useStore();
    const dispatch = useDispatch();
    const [listProduct, setListProduct] = useState([]);
    const [checkRemove, setCheckRemove] = useState(false);

    useEffect(() => {
        setListProduct(store.getState().cart.data);
    }, [checkRemove])

    const [numberProduct, setNumberProduct] = useState(null);
    const [numberVariable, setNumberVariable] = useState(null);
    const [valueSendPayment, setValueSendPayment] = useState({
        price: '',
        variable: '',
        promotionChoose: '',
        paymentCart: '',
    });

    //REMOVE PRODUCT
    const handleRemoveProduct = (id) => {
        console.log(id, 'id');
        let formRemove = removeProductCart(id);
        dispatch(formRemove);
        setCheckRemove(!checkRemove);
    }
    //END REMOVE PRODUCT

    const [productPrice, setProductPrice] = useState([
    ]);

    let handleNumber = {
        numberProduct,
        numberVariable,
        valueSendPayment,
        productPrice,
        setProductPrice,
        setNumberProduct,
        setNumberVariable,
        setValueSendPayment,
        handleRemoveProduct,
    }

    useEffect(() => {

        setValueSendPayment({
            ...valueSendPayment,
            // price: productPrice.cost
        });
        for (let i = 1; i <= listProduct.length; i++) {
            setProductPrice(e => {
                let data = [...e];
                let obj = {};
                obj['title'] = `p${i}`;
                obj['cost'] = 0;
                obj['price'] = 0;
                data.push(obj);

                return data;
            });
        }

    }, [listProduct])

    //SUM PRICE
    const [sumPrice, setSumPrice] = useState({
        cost: 0,
        sale: 0,
        price: 0,
    });

    useEffect(() => {

        for (let i = 0; i < productPrice.length; i++) {

            setSumPrice(z => {
                let data = { ...z };
                data.cost = data.cost + productPrice[i].cost;
                data.price = data.price + productPrice[i].price;
                data.sale = data.sale + (productPrice[i].cost - productPrice[i].price);

                return data;
            });

        }

    }, [productPrice])

    //END SUM PRICE

    console.log(productPrice, 'productPrice');

    //ORDER API
    const [orderApi, setOrderApi] = useState([

    ]);
    const handleOrder = () => {//user

        for (let i = 0; i < listProduct.length; i++) {
            setOrderApi(e => {
                let data = [...e];
                let obj = {};
                obj['idPhone'] = listProduct[i].idPhone;
                obj['slugProduct'] = listProduct[i].selected.slug;
                obj['titleProduct'] = listProduct[i].selected.title + `x${$(`.total_product${i} .total_product`).text()} - ${$(`.select_variable_${i} :selected`).text()}`;
                obj['price'] = sumPrice.price
                obj['sale'] = sumPrice.sale;
                obj['cost'] = sumPrice.cost;
                obj['promotion'] = listProduct[i].selected.promotionChoose;
                obj['userBuy'] = 1;

                data.push(obj);
                return data;
            });
        }

    }
    //END ORDER API

    console.log(orderApi, 'orderApi');

    return (
        <div className="cart_box">
            <div className="container_cart box_shadow">
                <h2>Có {listProduct?.length} sản phẩm trong giỏ hàng</h2>
                {
                    listProduct.length > 0 ?
                        <ul className="list_product_cart">
                            {
                                listProduct?.map((e, i) => {
                                    return (
                                        <li key={i}>
                                            <ItemsCart e={e} i={i} handleNumber={handleNumber} />
                                        </li>
                                    );
                                })
                            }

                        </ul>
                        : ''
                }
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
                            <span>{sumPrice?.cost}</span>
                        </div>
                        <div className="box_price_discount">
                            <p>Giảm: </p>
                            <span>{sumPrice?.sale}</span>
                        </div>
                        <div className="box_price_discount total">
                            <p>Cần thanh toán: </p>
                            <span>{sumPrice?.price}</span>
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
                    <button onClick={() => handleOrder()}>Hoàn tất đặt hàng</button>
                    <p>Bằng cách đặt hàng, bạn đồng ý với điểu khoản của Shop</p>
                </div>
            </div>
        </div>
    );
}