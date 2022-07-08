import { useEffect, useState } from "react";
import ItemsCart from "./ItemsCart/ItemsCart";
import { useStore, useDispatch } from "react-redux";
import { removeProductCart, loginSuccess } from "../../Action/Action";
import $ from 'jquery';
import { axiosJWT } from "../../AxiosJWT";
import { getAllCart } from "../api/ApiCart";
import { addToCart, emptyCart } from "../../Action/Action";
import { addNewOrderUser } from "../api/ApiOrderUser";
import { deleteAllCart } from "../api/ApiCart";
import { iconLoading } from "../svg/svg";
import { deleteCart } from "../api/ApiCart";

export default function Cart({ handleRedirect }) {
    const store = useStore();
    const dispatch = useDispatch();

    const keyJwt = localStorage.getItem('token');
    const user = handleRedirect.userCurrentByToken;

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.user = true;
            return data;
        })
    }, [])
    const [isLoading, setIsLoading] = useState(true);
    const [listProduct, setListProduct] = useState([]);
    const [checkRemove, setCheckRemove] = useState(false);

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetAllCart = async () => {
            try {
                let data = await getAllCart(keyJwt, axiosJwt);
                console.log('get all cart SUCCESS', data);
                setListProduct(data);
                setIsLoading(false);
                if (data.length > 0) {
                    // let addToCartRedux = addToCart(data);
                    // dispatch(addToCartRedux);
                }
            } catch (error) {
                console.log('get all cart err 1');
                setIsLoading(false);
            }
        };
        fetchGetAllCart();
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
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        console.log(id, 'id');
        const fetchDeleteCartId = async () => {
            try {
                let data = await deleteCart(keyJwt, axiosJwt, id);
                let formRemove = removeProductCart(id);
                dispatch(formRemove);
                setCheckRemove(!checkRemove);
                console.log('delete success', data);
            } catch (error) {
                console.log('delete cart err 1');
            }
        }
        fetchDeleteCartId();
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

        setSumPrice({
            cost: 0,
            sale: 0,
            price: 0,
        });
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

    //ORDER API
    const [orderApi, setOrderApi] = useState([]);
    const [checkOrder, setCheckOrder] = useState(false);
    const handleOrder = () => {//user

        for (let i = 0; i < listProduct.length; i++) {
            setOrderApi(e => {
                let data = [...e];
                let obj = {};
                obj['idPhone'] = listProduct[i].idPhone;
                obj['slug'] = listProduct[i].selected.slug;
                obj['title'] = listProduct[i].selected.title + `x${$(`.total_product${i} .total_product`).text()} - ${$(`.select_variable_${i} :selected`).text()}`;
                obj['price'] = sumPrice.price
                obj['sale'] = sumPrice.sale;
                obj['cost'] = sumPrice.cost;
                obj['promotion'] = listProduct[i].selected.promotionChoose;
                obj['userbuy'] = user.userId;

                data.push(obj);
                return data;
            });
        }

        setCheckOrder(true);
    }

    useEffect(() => {

        if (checkOrder) {
            setIsLoading(true);
            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchAddNewOrderUser = async () => {
                try {
                    let data = await addNewOrderUser(orderApi);
                    console.log('add news order user success', data);
                    let removeAllCart = await deleteAllCart(keyJwt, axiosJwt);
                    console.log('remove all cart success', removeAllCart);
                    setCheckRemove(!checkRemove);
                    setCheckOrder(false);
                    setIsLoading(false);
                    dispatch(emptyCart());

                } catch (error) {
                    setIsLoading(false);
                    setCheckOrder(false);
                    console.log('add news order user err');
                }
            }
            fetchAddNewOrderUser();
            console.log(orderApi, 'orderApi');
        }

    }, [checkOrder])
    //END ORDER API


    return (
        <div className="cart_box">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
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