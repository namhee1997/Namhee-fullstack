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
import { iconLoading } from "../svg/svg";

moment().format();

export default function Product({ handleRedirect }) {

    const store = useStore();
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);

    const [isLoading, setIsLoading] = useState(true);
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
                setIsLoading(false);
            } catch (error) {
                console.log('get product err1');
                setIsLoading(false);
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
    }, [infoSinglePhone, param])


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
        user: user.username,
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
        if (Object.keys(infoSinglePhone).length > 0) {

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
                    setTotalRate({
                        idPhone: "0",
                        idrate: 0,
                        listCommentRate: [],
                        totalstart: { start5: 0, start4: 0, start3: 0, start2: 0, start1: 0 },
                    });
                    setRerenderRate(false);
                }
            }
            fetchGetRateById();

        }
    }, [infoSinglePhone, rerenderRate, param])

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
    }, [totalRate, param])

    useEffect(() => {
        if (Object.keys(totalRate).length > 0) {
            setPageCountPagingRate(Math.ceil(totalRate.listCommentRate.length / perPageRate));
            let slice = totalRate?.listCommentRate.slice(offsetPagingRate, offsetPagingRate + perPageRate)
            setDataPagingRate(slice);

        }
    }, [totalRate, handlePaGingClickRate, param])

    const handleSendRate = () => {
        let dataCustomsRates = { ...boxSendRate };
        dataCustomsRates.idPhone = infoSinglePhone.idPhone;
        setIsLoading(true);
        const fechAddRatesProduct = async () => {
            try {
                let data = await addNewRatesProduct(dataCustomsRates);
                console.log('add rates product success', data);
                setRerenderRate(true);
                setIsLoading(false);
            } catch (error) {
                console.log('add rates product err 1');
                setRerenderRate(true);
                setIsLoading(false);
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
        user: user.username,
        avt: user.avatar,
        idUser: user.userId,
        isAdmin: user.role == 'admin' ? true : false,
        idPhone: '',
        idComment: 0,
    })
    const [handleComment, setHandleComment] = useState({
        title: '',
        user: user.username,
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
        if (Object.keys(infoSinglePhone).length > 0) {

            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchGetCommentById = async () => {
                try {
                    let data = await getCommentProductById(keyJwt, axiosJwt, infoSinglePhone?.idPhone);
                    console.log('get success comment ', data);
                    setDataComment(data.length > 0 ? data : { idComment: '' });

                    setRerenderComment(false);
                    setHandlePaGingComment(!handlePaGingClickRate);

                } catch (error) {
                    console.log('get err comment');
                    setRerenderComment(false);
                    setDataComment({ idComment: '' });
                }
            }
            fetchGetCommentById();

        }
    }, [infoSinglePhone, rerenderComment, param])

    useEffect(() => {
        if (Object.keys(dataComment).length > 0) {
            if (dataComment.idComment != '') {
                setPageCountPagingComment(Math.ceil(dataComment.length / perPageComment));
                let slice = dataComment?.slice(offsetPagingComment, offsetPagingComment + perPageComment)
                setDataPagingComment(slice);
            } else {
                setDataPagingComment([]);
            }

        }
    }, [dataComment, handlePaGingComment])


    const handleClickCommentPaGing = (e) => {
        let selectedPage = e.selected;
        setOffsetPagingComment(selectedPage * perPageComment);
        setHandlePaGingComment(!handlePaGingComment);
    };


    const handleSendComment = () => {
        console.log('handleSendComment', handleComment); //api
        setIsLoading(true);
        const fetchAddComment = async () => {
            try {
                let data = addNewCommentProduct(handleComment);
                console.log('add comment success', data);
                setRerenderComment(true);
                setHandleComment({ ...handleComment, title: '' })
                setIsLoading(false);

            } catch (error) {
                console.log('add comment err 1');
                setRerenderComment(true);
                setIsLoading(false);
            }
        }
        fetchAddComment();
    }

    const handleReplyComment = (id_comment, idUser) => {
        console.log('handleReply', handleReply);//api
        setIsLoading(true);

        const fetchUpdateComment = async () => {
            try {
                let data = updateCommentProduct(handleReply);
                console.log('update comment success', data);
                setRerenderComment(true);
                setHandleReply({ ...handleReply, title: '' });
                setIsLoading(false);

            } catch (error) {
                console.log('update comment err 1');
                setRerenderComment(true);
                setIsLoading(false);
            }
        }
        fetchUpdateComment();
    }
    //END COMMENT


    let textRateStart = ['', 'Kh??ng ???n', 'T???m ???????c', 'B??nh th?????ng', 'H??i l??ng', 'Tuy???t v???i'];

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
        setIsLoading(true);
        setClickAddCart(!clickAddCart);
        setTimeout(() => {
            const fetchAddNewCart = async () => {
                try {
                    let data = await addNewCart(dataTotal);
                    console.log('add new cart success', data);
                    // dataTotal._id = data?._id;
                    let addToCartRedux = addToCart(dataTotal);
                    dispatch(addToCartRedux);
                    setIsLoading(false);
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
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
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
                        <p>{totalRate?.listCommentRate?.length} ????nh gi??</p>
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
                        <Link to='/info-phone'>Xem chi ti???t th??ng s??? k??? thu???t</Link>
                    </div>
                    <div className="info_more_free">
                        <div className="left_free">
                            <i className="fa-solid fa-landmark-flag"></i>
                            <p>
                                H??ng ch??nh h??ng b???o h??nh 12 th??ng
                            </p>
                        </div>
                        <div className="right_free">
                            <i className="fa-solid fa-car-side"></i>
                            <p>
                                Giao h??ng to??n qu???c.
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
                        <h4>Ch???n 1 trong 2 khuy???n m??i sau</h4>
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

                            <h3>??u ????i th??m</h3>
                            <div className="box_promotion_more">
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-square-check"></i>
                                        <p>Mi???n ph?? v???n chuy???n tr??n to??n qu???c</p>
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
                                    Thanh to??n VNPAY
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
                                    Thanh to??n v?? Moca tr??n ???ng d???ng Grab
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
                                Giao h??ng mi???n ph?? ho???c nh???n t???i shop
                            </p>
                        </Link>
                        <div className="add_to_cart" onClick={() => handleAddToCard()}>
                            <h4>Th??m v??o gi??? h??ng</h4>
                        </div>
                    </div>
                    <div className="hotline">
                        <p>
                            G???i ngay <Link to='tel:0968796297'>0968796297</Link> ????? ???????c t?? v???n!
                        </p>
                    </div>
                </div>
            </div>
            <div className="info_more_product">
                <div className="box_flex">
                    <div className="box_left_more box_shadow">
                        <div className="box_more_info">
                            <h3>?????c ??i???m n???i b???t c???a {infoSinglePhone?.title}</h3>
                            <Banner dataBanner={salientFeatures} />
                        </div>
                        <div className="text_content_more">
                            <h3>????nh gi?? chi ti???t {infoSinglePhone?.title}</h3>
                            <div className="box_text">
                                <a href="https://fptshop.com.vn/dien-thoai/oppo-reno7-z">OPPO Reno7 Z 5G</a> chinh ph???c ng?????i d??ng ngay t??? ??nh nh??n ?????u ti??n v???i thi???t k??? th???i th?????ng b???c nh???t. B??n trong <a href="https://fptshop.com.vn/dien-thoai">??i???n tho???i</a> c??n c?? n???i l???c m???nh m??? t??? c??ng ngh??? c???i ti???n, h??? th???ng camera ch??n dung tuy???t ?????nh, vi x??? l?? Snapdragon 695 5G v?? s???c si??u t???c 33W, gi??p b???n s???n s??ng kh??m ph?? cu???c s???ng tr??n ?????y m??u s???c.
                                <img src="https://fptshop.com.vn/Uploads/images/2015/OPPO-Reno7-Z-5G.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="box_right_more box_shadow">
                        <div className="box_right_ ">
                            <h3>Th??ng s??? k??? thu???t</h3>
                            <table className="st-pd-table">
                                <tbody>
                                    <tr>
                                        <td>M??n h??nh</td>
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
                                        <td>B??? nh???</td>
                                        <td>{infoSinglePhone?.infophone?.memory}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="ask_questions box_shadow">
                    <div className="container_ask">
                        <h2>C??u h???i th?????ng g???p</h2>
                        <ul>
                            <li>
                                <div className="ask">
                                    <div className="title_ask">
                                        <i className="fa-solid fa-question"></i>
                                        <p>
                                            Mua s???n ph???m t???i Shop c?? ???????c ?????i tr??? kh??ng? N???u ???????c th?? ph?? ?????i tr??? s??? ???????c t??nh nh?? th??? n??o?
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
                                        ?????i v???i c??c s???n ph???m ??TD??, MTB, MTXT, SMARTWATCH (??p d???ng bao g???m c??c s???n ph???m Apple), s???n ph???m c??ng model, c??ng m??u, c??ng dung l?????ng. Trong t??nh hu???ng s???n ph???m ?????i h???t h??ng, kh??ch h??ng c?? th??? ?????i sang m???t s???n ph???m kh??c t????ng ??????ng ho???c cao h??n v??? gi?? tr??? so v???i s???n ph???m l???i. Tr?????ng h???p kh??ch h??ng mu???n tr??? s???n ph???m: FPTShop s??? ki???m tra t??nh tr???ng m??y v?? th??ng b??o ?????n Kh??ch h??ng v??? gi?? tr??? thu l???i s???n ph???m ngay t???i c???a h??ng.
                                        ????? bi???t th??m th??ng tin chi ti???t, qu?? kh??ch h??ng truy c???p ???????ng d???n b??n d?????i ????? n???m ???????c ph?? ?????i tr??? chi ti???t nh???t.&nbsp;
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="ask">
                                    <div className="title_ask">
                                        <i className="fa-solid fa-question"></i>
                                        <p>
                                            Ch??nh s??ch b???o h??nh ??i???n tho???i khi mua t???i FPT Shop nh?? th??? n??o?
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
                                        ????? ?????m b???o quy???n l???i c???a qu?? kh??ch h??ng khi mua s???n ph???m t???i c??c c???a h??ng thu???c h??? th???ng c???a h??ng FPT Shop. Ch??ng t??i cam k???t t???t c??? c??c s???n ph???m ???????c tu??n theo c??c ??i???u kho???n b???o h??nh c???a s???n ph???m t???i th???i ??i???m xu???t h??a ????n cho qu?? kh??ch h??ng. C??c s???n ph???m ??i???n tho???i s??? c?? ch??nh s??ch b???o h??nh kh??c nhau t??y thu???c v??o h??ng s???n xu???t. Kh??ch h??ng c?? th??? b???o h??nh m??y t???i c??c c???a h??ng FPT Shop tr??n to??n qu???c c??ng nh?? c??c trung t??m b???o h??nh ch??nh h??ng s???n ph???m.
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="product_relater box_shadow">
                    <div className="product_relater_container">
                        <h2>S???n ph???m li??n quan</h2>
                        <RelaterProduct listProduct={itemsRelater} />
                    </div>
                </div>
                <div className="rate box_shadow">
                    <div className="container_rate">
                        <h3>????nh gi?? nh???n x??t v??? {infoSinglePhone?.title}</h3>
                        <div className="box_total_rate">
                            <div className="rate_1">
                                <h4>????nh gi?? trung b??nh</h4>
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
                                    <span>{totalRate?.listCommentRate?.length}</span> ????nh gi?? & nh???n x??t
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
                                <p>B???n ???? d??ng s???n ph???m n??y?</p>
                                <h4
                                    onClick={() => {
                                        setBoxSendRate({
                                            ...boxSendRate,
                                            status: true,
                                        })
                                    }}
                                >G???i ????nh gi?? c???a b???n</h4>
                            </div>
                        </div>
                    </div>
                    <div className={`send_rate ${boxSendRate.status ? '' : 'none'}`} >
                        <div className="rate_choose">
                            <p>B???n ch???m s???n ph???m n??y bao nhi???u sao?</p>
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
                                G???i ????nh gi??
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
                                                <img src={e.avt == "" ? "https://www.maxpixel.net/static/photo/640/Avatar-Blank-Profile-Picture-Display-Pic-Mystery-Man-973460.png" : e.avt} alt="" />
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
                        <h2>H???i & ????p v??? {infoSinglePhone?.title}</h2>
                        <div className="box_send_comment">
                            <textarea name="send_comment" id="send_comment" cols="30" rows="10"
                                placeholder="Vi???t c??u h???i c???a b???n"
                                value={handleComment.title}
                                onChange={(e) => setHandleComment({
                                    ...handleComment,
                                    title: e.target.value,
                                    idPhone: infoSinglePhone.idPhone
                                })}
                            ></textarea>
                            <p className="send_comment" onClick={() => handleSendComment()}>G???i c??u h???i</p>
                        </div>
                        <div className="list_comment">
                            <ul>
                                {
                                    dataComment.idComment != '' ? dataPagingComment?.map((e, i) =>
                                        <li key={i}>
                                            <div className="thumb_user_rate">
                                                <div className="box_avata">
                                                    <img src={e.avt == "" ? "https://www.maxpixel.net/static/photo/640/Avatar-Blank-Profile-Picture-Display-Pic-Mystery-Man-973460.png" : e.avt} alt="" />
                                                </div>
                                            </div>
                                            <div className="info_user_comment">
                                                <div className="name_comment">
                                                    <h4>{e?.user} {e?.isAdmin ? <span>Qu???n tr??? vi??n</span> : ''}</h4>
                                                    <p className="time_comment">{moment(e?.createdAt).fromNow()}</p>
                                                </div>
                                                <div className="content_rate_text">
                                                    {e?.title}
                                                </div>
                                                <div className="reply_box_title"
                                                    onClick={() => { setHandleReply({ ...handleReply, status: true, idComment: e.idComment }); }}>
                                                    <p>Tr??? l???i</p>
                                                </div>
                                                <ul className="reply_comment">
                                                    {
                                                        e?.listReply?.map((z, x) =>
                                                            <li key={x}>
                                                                <div className="thumb_user_rate">
                                                                    <div className="box_avata">{z.avt}</div>
                                                                </div>
                                                                <div className="info_user_comment">
                                                                    <div className="name_comment">
                                                                        <h4>{z.user} {z.isAdmin ? <span>Qu???n tr??? vi??n</span> : ''}</h4>
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
                                                        onClick={() => handleReplyComment(e.id_comment, e.idUser)}>G???i c??u tr??? l???i</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                        : ''
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