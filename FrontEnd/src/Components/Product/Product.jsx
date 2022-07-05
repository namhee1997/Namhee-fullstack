import { useEffect, useRef, useState } from "react";
import Banner from "../Other/Banner";
import { useStore, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import RelaterProduct from "../Home/RelaterProduct/RelaterProduct";
import { addToCart, loginSuccess } from "../../Action/Action";
import $ from 'jquery';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProductRelater } from "../api/ApiProduct";
import { axiosJWT } from "../../AxiosJWT";
import { addNewCart } from "../api/ApiCart";
import { addNewRatesProduct, getAllRatesProduct, getRatesProductById } from "../api/ApiRateProduct";
import jwtDecode from 'jwt-decode';
import { addNewCommentProduct, updateCommentProduct, getCommentProductById } from "../api/ApiCommentProduct";

moment().format();

export default function Product({ handleRedirect }) {

    const store = useStore();
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.user = true;
            return data;
        })
    }, [])
    const [infoSinglePhone, setInfoSinglePhone] = useState([]);
    const [itemsRelater, setItemsRelater] = useState([]);

    const [salientFeatures, setSalientFeatures] = useState([
        { thumb: 'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233261978253_oppo-reno7-z-chan-dung.png' },
        { thumb: 'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233275415887_oppo-reno7-z-sac-nhanh.png' },
        { thumb: 'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233274322124_oppo-reno7-z-thiet-ke.png' },
    ]);

    const [variableProduct, setVariableProduct] = useState(0);

    /////////GET 
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

        const fetchGetProductById = async () => {
            try {
                let data = await getProductById(keyJwt, axiosJwt, param.slug);
                console.log('get product success', data);
                setInfoSinglePhone(data[0]);
            } catch (error) {
                console.log('get product err1');
            }
        }

        fetchGetProductById();
    }, [param])

    useEffect(() => {
        if (Object.keys(infoSinglePhone).length > 0) {
            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchGetProductRelater = async () => {
                try {
                    let data = await getProductRelater(keyJwt, axiosJwt, infoSinglePhone.company, infoSinglePhone.idPhone);
                    console.log('get product relater success', data);
                    setItemsRelater(data);
                } catch (error) {
                    console.log('get product relater err1');
                }
            }
            fetchGetProductRelater();
        }
    }, [infoSinglePhone])


    // console.log(infoSinglePhone, 'infoSinglePhone');
    /////////GET


    //PROMOTION
    const [listPromotion, setListPromotion] = useState([]);
    const [choosePromotion, setChoosePromotion] = useState(1);

    useEffect(() => {
        setListPromotion(store.getState().promotionList.data);
    }, [listPromotion])

    //END PROMOTION

    //PAYMENT
    const [paymentMethods, setPaymentMethods] = useState({
        vnp: true,
        moca: false,
    });
    //END PAYMENT

    //RATE

    const [boxSendRate, setBoxSendRate] = useState({
        status: false,
        start: 0,
        title: '',
        user: user.fullname,
        avt: user.avatar

    });

    const [totalRate, setTotalRate] = useState({});
    const [rerenderRate, setRerenderRate] = useState(true);
    const [startRate, setStartRate] = useState({
        averageRating: '',
        listRow: {}
    });

    //PAGING rate
    const [offsetPagingRate, setOffsetPagingRate] = useState(0);
    const [dataPagingRate, setDataPagingRate] = useState([]);
    const [perPageRate] = useState(5);
    const [pageCountPagingRate, setPageCountPagingRate] = useState(0);
    const [handlePaGingClickRate, setHandlePaGingClickRate] = useState(true);

    useEffect(() => {
        if (Object.keys(infoSinglePhone).length > 0 && rerenderRate) {

            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchGetRateById = async () => {
                try {
                    let data = await getRatesProductById(keyJwt, axiosJwt, infoSinglePhone?.idPhone);
                    console.log('get success ', data);
                    setTotalRate(data[0]);

                    setRerenderRate(false);
                    setHandlePaGingClickRate(!handlePaGingClickRate);

                } catch (error) {
                    console.log('get err');
                    setRerenderRate(false);
                }
            }
            fetchGetRateById();

        }
    }, [infoSinglePhone, rerenderRate])

    useEffect(() => {
        if (Object.keys(totalRate).length > 0) {

            setStartRate(e => {
                let data = { ...e };
                let totalStart = totalRate.totalstart ? totalRate.totalstart : {};
                let arrKey = Object.keys(totalStart);
                let arrValue = Object.values(totalStart);
                //averageRating
                let max = Math.max(...arrValue);
                let position = arrValue.indexOf(max);
                data.averageRating = arrKey[position];
                //end averageRating
                //listRow
                let sum = arrValue.reduce((a, b) => a + b, 0);

                data.listRow['start5'] = +(((totalStart.start5) / sum) * 100).toFixed(1);
                data.listRow['start4'] = +(((totalStart.start4) / sum) * 100).toFixed(1);
                data.listRow['start3'] = +(((totalStart.start3) / sum) * 100).toFixed(1);
                data.listRow['start2'] = +(((totalStart.start2) / sum) * 100).toFixed(1);
                data.listRow['start1'] = +(((totalStart.start1) / sum) * 100).toFixed(1);

                //end listRow


                return data;
            });
        }
    }, [totalRate])

    useEffect(() => {
        if (Object.keys(totalRate).length > 0) {
            setPageCountPagingRate(Math.ceil(totalRate.listCommentRate.length / perPageRate));
            let slice = totalRate?.listCommentRate.slice(offsetPagingRate, offsetPagingRate + perPageRate)
            setDataPagingRate(slice);

        }
    }, [totalRate, handlePaGingClickRate])

    const handleSendRate = () => {
        let dataCustomsRates = { ...boxSendRate };
        dataCustomsRates.idPhone = infoSinglePhone.idPhone;
        const fechAddRatesProduct = async () => {
            try {
                let data = await addNewRatesProduct(dataCustomsRates);
                console.log('add rates product success', data);
                setRerenderRate(true);
            } catch (error) {
                console.log('add rates product err 1');
                setRerenderRate(true);
            }
        };
        fechAddRatesProduct();
    }


    const handleClickRatePaGing = (e) => {
        let selectedPage = e.selected;
        setOffsetPagingRate(selectedPage * perPageRate);
        setHandlePaGingClickRate(!handlePaGingClickRate);
    };

    //END RATE

    //COMMENT

    const [handleReply, setHandleReply] = useState({
        status: false,
        title: '',
        user: user.fullname,
        avt: user.avatar,
        idUser: user.userId,
        isAdmin: user.role == 'admin' ? true : false,
        idPhone: '',
        idComment: 0,
    })
    const [handleComment, setHandleComment] = useState({
        title: '',
        user: user.fullname,
        avt: user.avatar,
        idUser: user.userId,
        isAdmin: user.role == 'admin' ? true : false,
        idPhone: '',
    });


    const [dataComment, setDataComment] = useState([]);
    const [rerenderComment, setRerenderComment] = useState(true);

    //PAGING comment
    const [offsetPagingComment, setOffsetPagingComment] = useState(0);
    const [dataPagingComment, setDataPagingComment] = useState([]);
    const [perPageComment] = useState(5);
    const [pageCountPagingComment, setPageCountPagingComment] = useState(0);
    const [handlePaGingComment, setHandlePaGingComment] = useState(true);

    useEffect(() => {
        if (Object.keys(infoSinglePhone).length > 0 && rerenderComment) {

            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchGetCommentById = async () => {
                try {
                    let data = await getCommentProductById(keyJwt, axiosJwt, infoSinglePhone?.idPhone);
                    console.log('get success comment ', data);
                    setDataComment(data);

                    setRerenderComment(false);
                    setHandlePaGingComment(!handlePaGingClickRate);

                } catch (error) {
                    console.log('get err');
                    setRerenderComment(false);
                }
            }
            fetchGetCommentById();

        }
    }, [infoSinglePhone, rerenderComment])

    useEffect(() => {
        if (Object.keys(dataComment).length > 0) {
            setPageCountPagingComment(Math.ceil(dataComment.length / perPageComment));
            let slice = dataComment?.slice(offsetPagingComment, offsetPagingComment + perPageComment)
            setDataPagingComment(slice);

        }
    }, [dataComment, handlePaGingComment])


    const handleClickCommentPaGing = (e) => {
        let selectedPage = e.selected;
        setOffsetPagingComment(selectedPage * perPageComment);
        setHandlePaGingComment(!handlePaGingComment);
    };


    const handleSendComment = () => {
        console.log('handleSendComment', handleComment); //api
        const fetchAddComment = async () => {
            try {
                let data = addNewCommentProduct(handleComment);
                console.log('add comment success', data);
                setRerenderComment(true);
                setHandleComment({ ...handleComment, title: '' })

            } catch (error) {
                console.log('add comment err 1');
                setRerenderComment(true);
            }
        }
        fetchAddComment();
    }

    const handleReplyComment = (id_comment, idUser) => {
        console.log('handleReply', handleReply);//api

        const fetchUpdateComment = async () => {
            try {
                let data = updateCommentProduct(handleReply);
                console.log('update comment success', data);
                setRerenderComment(true);
                setHandleReply({ ...handleReply, title: '' });

            } catch (error) {
                console.log('update comment err 1');
                setRerenderComment(true);
            }
        }
        fetchUpdateComment();
    }
    //END COMMENT


    let textRateStart = ['', 'Không ổn', 'Tạm được', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

    let clickAsk1 = useRef();
    let clickAsk2 = useRef();
    let questionsAsk1 = useRef();
    let questionsAsk2 = useRef();

    useEffect(() => {
        for (let i = 0; i < (clickAsk1.current.children).length; i++) {
            $(clickAsk1.current.children[i]).click(() => {
                if ($(clickAsk1.current).hasClass('active')) {
                    $(clickAsk1.current).removeClass('active');
                    $(questionsAsk1.current).slideUp();
                } else {
                    $(questionsAsk1.current).slideDown();
                    $(clickAsk1.current).addClass('active');
                }
            })
        }
        for (let i = 0; i < (clickAsk2.current.children).length; i++) {
            $(clickAsk2.current.children[i]).click(() => {
                if ($(clickAsk2.current).hasClass('active')) {
                    $(clickAsk2.current).removeClass('active');
                    $(questionsAsk2.current).slideUp();
                } else {
                    $(clickAsk2.current).addClass('active');
                    $(questionsAsk2.current).slideDown();
                }
            })
        }

    }, [])


    // DATA SEND

    const [dataTotal, setDataTotal] = useState({
        selected: {},
        dataTotal: {},
        totalCurrent: 1,
        idPhone: ''
    });
    const [clickAddCart, setClickAddCart] = useState(true);

    useEffect(() => {
        setDataTotal(e => {
            let data = { ...e };
            let dataTotalArr = [];
            data.idPhone = infoSinglePhone?.idPhone;
            data.totalCurrent = 1;
            data.userId = user.userId;
            //selected
            data.selected['variable'] = Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].title : '';
            data.selected['listimg'] = Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].listimg : '';
            data.selected['title'] = infoSinglePhone?.title;
            data.selected['slug'] = infoSinglePhone?.slug;
            data.selected['sale'] = Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].sale : 0;
            data.selected['price'] = Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].price : 0;
            data.selected['cost'] = Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].cost : 0;
            data.selected['company'] = infoSinglePhone?.company;
            data.selected['promotion'] = infoSinglePhone?.promotion;
            data.selected['promotionChoose'] = choosePromotion;
            if (paymentMethods.moca) {
                data.selected['paymentCart'] = 'moca';
            }
            if (paymentMethods.vnp) {
                data.selected['paymentCart'] = 'vnp';
            }
            //end selected
            //for custom data total
            for (let o = 0; o < (infoSinglePhone?.variable?.length > 0 ? infoSinglePhone?.variable : []).length; o++) {
                dataTotalArr.push({
                    variable: infoSinglePhone?.variable[o].title,
                    data: {
                        title: '',
                        slug: infoSinglePhone?.slug,
                        installment: '0',
                        sale: infoSinglePhone?.variable[o].sale,
                        price: infoSinglePhone?.variable[o].price,
                        company: infoSinglePhone?.company,
                        cost: infoSinglePhone?.variable[o].cost,
                        promotion: infoSinglePhone?.promotion,
                    },
                });
            }

            //dataTotal
            data.dataTotal['promotionChoose'] = listPromotion;
            data.dataTotal['totalSelect'] = dataTotalArr;
            //end dataTotal

            return data;
        })
    }, [variableProduct, choosePromotion, paymentMethods, clickAddCart, infoSinglePhone])

    const handleAddToCard = (e, buy) => {
        if (buy == 'buy') {
            e.preventDefault();
        }
        setClickAddCart(!clickAddCart);
        setTimeout(() => {
            const fetchAddNewCart = async () => {
                try {
                    let data = await addNewCart(dataTotal);
                    console.log('add new cart success', data);
                    // dataTotal._id = data?._id;
                    let addToCartRedux = addToCart(dataTotal);
                    dispatch(addToCartRedux);
                    if (buy == 'buy') {
                        setTimeout(() => {
                            navigate('/cart');
                        }, 1000);
                    }
                } catch (error) {
                    console.log('add new cart err 1');
                }
            }
            fetchAddNewCart();

        }, 800);
    }

    //END DATA SEND
    return (
        <div className="product_phone">
            <div className="title_phone">
                <h1>{infoSinglePhone?.title}</h1>
                <div className="evaluate">
                    <div className="start">
                        <i className={`
                        fa-solid ${startRate?.averageRating == 'start1'
                                || startRate?.averageRating == 'start2'
                                || startRate?.averageRating == 'start3'
                                || startRate?.averageRating == 'start4'
                                || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                        <i className={`
                        fa-solid ${startRate?.averageRating == 'start2'
                                || startRate?.averageRating == 'start3'
                                || startRate?.averageRating == 'start4'
                                || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                        <i className={`
                        fa-solid ${startRate?.averageRating == 'start3'
                                || startRate?.averageRating == 'start4'
                                || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                        <i className={`
                        fa-solid ${startRate?.averageRating == 'start4'
                                || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                        <i className={`fa-solid ${startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star`}></i>
                    </div>
                    <div className="total_comment">
                        <p>{totalRate?.listCommentRate?.length} đánh giá</p>
                    </div>
                </div>
            </div>
            <div className="content_product">
                <div className="box_left_product">
                    <div className="slide_thumb_product">
                        <Banner dataBanner={Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct].listimg : []} thisPage='Product' />
                    </div>
                    <div className="info_phone">
                        <ul>
                            <li className="chipset">
                                <i className="fa-solid fa-microchip"></i>
                                <p>{infoSinglePhone?.infophone?.chip}</p>
                            </li>
                            <li className="screen">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <p>{infoSinglePhone?.infophone?.screen}</p>
                            </li>
                            <li className="ram">
                                <i className="fa-solid fa-memory"></i>
                                <p>{infoSinglePhone?.infophone?.ram}</p>
                            </li>
                            <li className="memory">
                                <i className="fa-solid fa-sd-card"></i>
                                <p>{infoSinglePhone?.infophone?.memory}</p>
                            </li>
                        </ul>
                        <Link to='/info-phone'>Xem chi tiết thông số kỹ thuật</Link>
                    </div>
                    <div className="info_more_free">
                        <div className="left_free">
                            <i className="fa-solid fa-landmark-flag"></i>
                            <p>
                                Hàng chính hãng bảo hành 12 tháng
                            </p>
                        </div>
                        <div className="right_free">
                            <i className="fa-solid fa-car-side"></i>
                            <p>
                                Giao hàng toàn quốc.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="box_right_product">
                    <h2>{Object.keys(infoSinglePhone).length > 0 ? infoSinglePhone?.variable[variableProduct]?.price : []}</h2>
                    <div className="list_ver_phone">
                        <ul>
                            {
                                infoSinglePhone?.variable?.map((e, i) => {
                                    return (
                                        <li key={i} className={variableProduct == i ? `active` : ``} onClick={() => setVariableProduct(i)}>
                                            <span>
                                                <img src={e.avatar} alt="" />
                                            </span>
                                            <p>{e.title}</p>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="box_promotion_product">
                        <h4>Chọn 1 trong 2 khuyến mãi sau</h4>
                        <div className="container_promotion">
                            {
                                listPromotion.map((e, i) => {
                                    return (
                                        <div className="checkbox_box" key={i}>
                                            <input checked={choosePromotion == e.slug ? true : false}
                                                type="checkbox" name="promotion_choose"
                                                id={e.slug}
                                                onClick={() => {
                                                    setChoosePromotion(e.slug)
                                                }}
                                                onChange={e => { }}
                                            />
                                            <label htmlFor={e.slug}>{e.title}</label>
                                        </div>
                                    );
                                })
                            }

                            <h3>Ưu đãi thêm</h3>
                            <div className="box_promotion_more">
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-square-check"></i>
                                        <p>Miễn phí vận chuyển trên toàn quốc</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="payment_methods">
                        <ul>
                            <li className={paymentMethods.vnp ? 'active' : ''}
                                onClick={() => {
                                    setPaymentMethods({
                                        vnp: true,
                                        moca: false,
                                    })
                                }}
                            >
                                <span>
                                    {
                                        paymentMethods.vnp ? <i className="fa-solid fa-check"></i> : ''
                                    }

                                </span>
                                <img src="https://fptshop.com.vn/Uploads/Originals/2021/3/15/637513980986241445_Logo-VNPAYQR-(1).jpg" alt="" />
                                <p>
                                    Thanh toán VNPAY
                                </p>
                            </li>
                            <li className={paymentMethods.moca ? 'active' : ''}
                                onClick={() => {
                                    setPaymentMethods({
                                        vnp: false,
                                        moca: true,
                                    })
                                }}
                            >
                                <span>
                                    {
                                        paymentMethods.moca ? <i className="fa-solid fa-check"></i> : ''
                                    }
                                </span>
                                <img src="https://fptshop.com.vn/Uploads/Originals/2020/12/4/637426739557050119_logo-moca.png" alt="" />
                                <p>
                                    Thanh toán ví Moca trên ứng dụng Grab
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="buying_product">
                        <Link to='/buy'
                            onClick={(zx) => handleAddToCard(zx, 'buy')}
                        >
                            <h4>Mua Ngay</h4>
                            <p>
                                Giao hàng miễn phí hoặc nhận tại shop
                            </p>
                        </Link>
                        <div className="add_to_cart" onClick={() => handleAddToCard()}>
                            <h4>Thêm vào giỏ hàng</h4>
                        </div>
                    </div>
                    <div className="hotline">
                        <p>
                            Gọi ngay <Link to='tel:0968796297'>0968796297</Link> để được tư vấn!
                        </p>
                    </div>
                </div>
            </div>
            <div className="info_more_product">
                <div className="box_flex">
                    <div className="box_left_more box_shadow">
                        <div className="box_more_info">
                            <h3>Đặc điểm nổi bật của {infoSinglePhone?.title}</h3>
                            <Banner dataBanner={salientFeatures} />
                        </div>
                        <div className="text_content_more">
                            <h3>Đánh giá chi tiết {infoSinglePhone?.title}</h3>
                            <div className="box_text">
                                <a href="https://fptshop.com.vn/dien-thoai/oppo-reno7-z">OPPO Reno7 Z 5G</a> chinh phục người dùng ngay từ ánh nhìn đầu tiên với thiết kế thời thượng bậc nhất. Bên trong <a href="https://fptshop.com.vn/dien-thoai">điện thoại</a> còn có nội lực mạnh mẽ từ công nghệ cải tiến, hệ thống camera chân dung tuyệt đỉnh, vi xử lý Snapdragon 695 5G và sạc siêu tốc 33W, giúp bạn sẵn sàng khám phá cuộc sống tràn đầy màu sắc.
                                <img src="https://fptshop.com.vn/Uploads/images/2015/OPPO-Reno7-Z-5G.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="box_right_more box_shadow">
                        <div className="box_right_ ">
                            <h3>Thông số kỹ thuật</h3>
                            <table className="st-pd-table">
                                <tbody>
                                    <tr>
                                        <td>Màn hình</td>
                                        <td>{infoSinglePhone?.infophone?.screen}</td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>{infoSinglePhone?.infophone?.chip}</td>
                                    </tr>
                                    <tr>
                                        <td>RAM</td>
                                        <td>{infoSinglePhone?.infophone?.ram}</td>
                                    </tr>
                                    <tr>
                                        <td>Bộ nhớ</td>
                                        <td>{infoSinglePhone?.infophone?.memory}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="ask_questions box_shadow">
                    <div className="container_ask">
                        <h2>Câu hỏi thường gặp</h2>
                        <ul>
                            <li>
                                <div className="ask">
                                    <div className="title_ask">
                                        <i className="fa-solid fa-question"></i>
                                        <p>
                                            Mua sản phẩm tại Shop có được đổi trả không? Nếu được thì phí đổi trả sẽ được tính như thế nào?
                                        </p>
                                    </div>
                                    <div ref={clickAsk1} className="handle_click">
                                        <div className="click_handle show">
                                            <i className="fa-solid fa-square-plus"></i>
                                        </div>
                                        <div className="click_handle hide">
                                            <i className="fa-solid fa-square-minus"></i>
                                        </div>
                                    </div>
                                </div>
                                <div ref={questionsAsk1} className="questions_ask">
                                    <p>
                                        Đối với các sản phẩm ĐTDĐ, MTB, MTXT, SMARTWATCH (Áp dụng bao gồm các sản phẩm Apple), sản phẩm cùng model, cùng màu, cùng dung lượng. Trong tình huống sản phẩm đổi hết hàng, khách hàng có thể đổi sang một sản phẩm khác tương đương hoặc cao hơn về giá trị so với sản phẩm lỗi. Trường hợp khách hàng muốn trả sản phẩm: FPTShop sẽ kiểm tra tình trạng máy và thông báo đến Khách hàng về giá trị thu lại sản phẩm ngay tại cửa hàng.
                                        Để biết thêm thông tin chi tiết, quý khách hàng truy cập đường dẫn bên dưới để nắm được phí đổi trả chi tiết nhất.&nbsp;
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="ask">
                                    <div className="title_ask">
                                        <i className="fa-solid fa-question"></i>
                                        <p>
                                            Chính sách bảo hành điện thoại khi mua tại FPT Shop như thế nào?
                                        </p>
                                    </div>
                                    <div ref={clickAsk2} className="handle_click">
                                        <div className="click_handle show">
                                            <i className="fa-solid fa-square-plus"></i>
                                        </div>
                                        <div className="click_handle hide">
                                            <i className="fa-solid fa-square-minus"></i>
                                        </div>
                                    </div>
                                </div>
                                <div ref={questionsAsk2} className="questions_ask">
                                    <p>
                                        Để đảm bảo quyền lợi của quý khách hàng khi mua sản phẩm tại các cửa hàng thuộc hệ thống cửa hàng FPT Shop. Chúng tôi cam kết tất cả các sản phẩm được tuân theo các điều khoản bảo hành của sản phẩm tại thời điểm xuất hóa đơn cho quý khách hàng. Các sản phẩm điện thoại sẽ có chính sách bảo hành khác nhau tùy thuộc vào hãng sản xuất. Khách hàng có thể bảo hành máy tại các cửa hàng FPT Shop trên toàn quốc cũng như các trung tâm bảo hành chính hãng sản phẩm.
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="product_relater box_shadow">
                    <div className="product_relater_container">
                        <h2>Sản phẩm liên quan</h2>
                        <RelaterProduct listProduct={itemsRelater} />
                    </div>
                </div>
                <div className="rate box_shadow">
                    <div className="container_rate">
                        <h3>Đánh giá nhận xét về {infoSinglePhone?.title}</h3>
                        <div className="box_total_rate">
                            <div className="rate_1">
                                <h4>Đánh giá trung bình</h4>
                                <div className="number_rate_1">
                                    <span>{startRate.averageRating == 'start5' ? 5 : startRate.averageRating == 'start4' ? 4 : startRate.averageRating == 'start3' ? 3 : startRate.averageRating == 'start2' ? 2 : startRate.averageRating == 'start1' ? 1 : ''}</span>/<span>5</span>
                                </div>
                                <div className="start_1 noall">
                                    <i className={`
                        fa-solid ${startRate?.averageRating == 'start1'
                                            || startRate?.averageRating == 'start2'
                                            || startRate?.averageRating == 'start3'
                                            || startRate?.averageRating == 'start4'
                                            || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                                    <i className={`
                        fa-solid ${startRate?.averageRating == 'start2'
                                            || startRate?.averageRating == 'start3'
                                            || startRate?.averageRating == 'start4'
                                            || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                                    <i className={`
                        fa-solid ${startRate?.averageRating == 'start3'
                                            || startRate?.averageRating == 'start4'
                                            || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                                    <i className={`
                        fa-solid ${startRate?.averageRating == 'start4'
                                            || startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star
                        `}></i>
                                    <i className={`fa-solid ${startRate?.averageRating == 'start5' ? `star-checked` : ``} fa-star`}></i>
                                </div>
                                <div className="text_1">
                                    <span>{totalRate?.listCommentRate?.length}</span> đánh giá & nhận xét
                                </div>
                            </div>
                            <div className="rate_2">
                                <div className="progress_item">
                                    <span>5</span>
                                    <i className="fa-solid fa-star"></i>
                                    <div className="row_2">
                                        <span className="child_row_2" style={{ 'width': `${startRate?.listRow?.start5}%` }}></span>
                                    </div>
                                    <div className="total_comment">
                                        <p>{totalRate?.totalStart?.start5}</p>
                                    </div>
                                </div>
                                <div className="progress_item">
                                    <span>4</span>
                                    <i className="fa-solid fa-star"></i>
                                    <div className="row_2">
                                        <span className="child_row_2" style={{ 'width': `${startRate?.listRow?.start4}%` }}></span>
                                    </div>
                                    <div className="total_comment">
                                        <p>{totalRate?.totalStart?.start4}</p>
                                    </div>
                                </div>
                                <div className="progress_item">
                                    <span>3</span>
                                    <i className="fa-solid fa-star"></i>
                                    <div className="row_2">
                                        <span className="child_row_2" style={{ 'width': `${startRate?.listRow?.start3}%` }}></span>
                                    </div>
                                    <div className="total_comment">
                                        <p>{totalRate?.totalStart?.start3}</p>
                                    </div>
                                </div>
                                <div className="progress_item">
                                    <span>2</span>
                                    <i className="fa-solid fa-star"></i>
                                    <div className="row_2">
                                        <span className="child_row_2" style={{ 'width': `${startRate?.listRow?.start2}%` }}></span>
                                    </div>
                                    <div className="total_comment">
                                        <p>{totalRate?.totalStart?.start2}</p>
                                    </div>
                                </div>
                                <div className="progress_item">
                                    <span>1</span>
                                    <i className="fa-solid fa-star"></i>
                                    <div className="row_2">
                                        <span className="child_row_2" style={{ 'width': `${startRate?.listRow?.start1}%` }}></span>
                                    </div>
                                    <div className="total_comment">
                                        <p>{totalRate?.totalStart?.start1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box_is_rate">
                                <p>Bạn đã dùng sản phẩm này?</p>
                                <h4
                                    onClick={() => {
                                        setBoxSendRate({
                                            ...boxSendRate,
                                            status: true,
                                        })
                                    }}
                                >Gửi đánh giá của bạn</h4>
                            </div>
                        </div>
                    </div>
                    <div className={`send_rate ${boxSendRate.status ? '' : 'none'}`} >
                        <div className="rate_choose">
                            <p>Bạn chấm sản phẩm này bao nhiều sao?</p>
                            <div className="list_start_rate">
                                <div className="start"
                                    onClick={() => {
                                        setBoxSendRate({ ...boxSendRate, start: 1 });
                                    }}
                                >
                                    <i className={`fa-solid fa-star ${boxSendRate.start >= 1 ? `star-checked` : ``}`}></i>
                                </div>
                                <div className="start"
                                    onClick={() => {
                                        setBoxSendRate({ ...boxSendRate, start: 2 });
                                    }}>
                                    <i className={`fa-solid fa-star ${boxSendRate.start >= 2 ? `star-checked` : ``}`}></i>
                                </div>
                                <div className="start"
                                    onClick={() => {
                                        setBoxSendRate({ ...boxSendRate, start: 3 });
                                    }}>
                                    <i className={`fa-solid fa-star ${boxSendRate.start >= 3 ? `star-checked` : ``}`}></i>
                                </div>
                                <div className="start"
                                    onClick={() => {
                                        setBoxSendRate({ ...boxSendRate, start: 4 });
                                    }}>
                                    <i className={`fa-solid fa-star ${boxSendRate.start >= 4 ? `star-checked` : ``}`}></i>
                                </div>
                                <div className="start"
                                    onClick={() => {
                                        setBoxSendRate({ ...boxSendRate, start: 5 });
                                    }}>
                                    <i className={`fa-solid fa-star ${boxSendRate.start === 5 ? `star-checked` : ``}`}></i>
                                </div>
                                <p className="state_start_choose">
                                    {textRateStart[boxSendRate.start]}
                                </p>
                            </div>
                        </div>
                        <div className="send_comment">
                            <textarea name="send_rate" id="" cols="30" rows="10"
                                onChange={(e) => setBoxSendRate({
                                    ...boxSendRate,
                                    title: e.target.value
                                })}
                            >

                            </textarea>
                            <p className="btn_send_rate" onClick={() => handleSendRate()}>
                                Gửi đánh giá
                            </p>
                        </div>
                    </div>

                    <div className="list_rate_user">
                        <ul>
                            {
                                dataPagingRate?.map((e, i) =>
                                    <li key={i}>
                                        <div className="thumb_user_rate">
                                            <div className="box_avata">
                                                <img src={e.avt} alt="" />
                                            </div>
                                        </div>
                                        <div className="info_user_rate">
                                            <h4>{e.user}</h4>
                                            <div className="box_rate_">
                                                <div className="rate_star">
                                                    <i className={`fa-solid ${e.start >= 1 ? `star-checked` : ``} fa-star`}></i>
                                                    <i className={`fa-solid ${e.start >= 2 ? `star-checked` : ``} fa-star`}></i>
                                                    <i className={`fa-solid ${e.start >= 3 ? `star-checked` : ``} fa-star`}></i>
                                                    <i className={`fa-solid ${e.start >= 4 ? `star-checked` : ``} fa-star`}></i>
                                                    <i className={`fa-solid ${e.start == 5 ? `star-checked` : ``} fa-star`}></i>
                                                </div>
                                                <p className="time_rate">{moment(e.createdAt).fromNow()}</p>
                                            </div>
                                            <div className="content_rate_text">
                                                {e.title}
                                            </div>

                                        </div>
                                    </li>
                                )
                            }

                        </ul>
                        <div className="list_pagination">

                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                pageCount={pageCountPagingRate}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handleClickRatePaGing}
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
                <div className="box_comment box_shadow">
                    <div className="container_box_comment">
                        <h2>Hỏi & Đáp về {infoSinglePhone?.title}</h2>
                        <div className="box_send_comment">
                            <textarea name="send_comment" id="send_comment" cols="30" rows="10"
                                placeholder="Viết câu hỏi của bạn"
                                value={handleComment.title}
                                onChange={(e) => setHandleComment({
                                    ...handleComment,
                                    title: e.target.value,
                                    idPhone: infoSinglePhone.idPhone
                                })}
                            ></textarea>
                            <p className="send_comment" onClick={() => handleSendComment()}>Gửi câu hỏi</p>
                        </div>
                        <div className="list_comment">
                            <ul>
                                {
                                    dataPagingComment.map((e, i) =>
                                        <li key={i}>
                                            <div className="thumb_user_rate">
                                                <div className="box_avata">
                                                    <img src={e.avt} alt="" />
                                                </div>
                                            </div>
                                            <div className="info_user_comment">
                                                <div className="name_comment">
                                                    <h4>{e.user} {e.isAdmin ? <span>Quản trị viên</span> : ''}</h4>
                                                    <p className="time_comment">{moment(e.createdAt).fromNow()}</p>
                                                </div>
                                                <div className="content_rate_text">
                                                    {e.title}
                                                </div>
                                                <div className="reply_box_title"
                                                    onClick={() => { setHandleReply({ ...handleReply, status: true, idComment: e.idComment }); }}>
                                                    <p>Trả lời</p>
                                                </div>
                                                <ul className="reply_comment">
                                                    {
                                                        e.listReply.map((z, x) =>
                                                            <li key={x}>
                                                                <div className="thumb_user_rate">
                                                                    <div className="box_avata">{z.avt}</div>
                                                                </div>
                                                                <div className="info_user_comment">
                                                                    <div className="name_comment">
                                                                        <h4>{z.user} {z.isAdmin ? <span>Quản trị viên</span> : ''}</h4>
                                                                        <p className="time_comment">{moment(z.createdAt).fromNow()}</p>
                                                                    </div>
                                                                    <div className="content_rate_text">
                                                                        {z.title}
                                                                    </div>

                                                                </div>
                                                            </li>
                                                        )
                                                    }

                                                </ul>
                                                <div className={`send_reply ${handleReply.idComment == e.idComment ? `` : `none`}`}>
                                                    <textarea name="send_reply" id="" cols="30" rows="10" value={handleReply.title}
                                                        onChange={(m) => setHandleReply({
                                                            ...handleReply,
                                                            title: m.target.value,
                                                            idPhone: infoSinglePhone.idPhone
                                                        })}
                                                    ></textarea>
                                                    <p className="send_reply_btn"
                                                        onClick={() => handleReplyComment(e.id_comment, e.idUser)}>Gửi câu trả lời</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }

                            </ul>
                            <div className="list_pagination">
                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    pageCount={pageCountPagingComment}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handleClickCommentPaGing}
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}