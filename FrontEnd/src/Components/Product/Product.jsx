import { useEffect, useRef, useState } from "react";
import Banner from "../Other/Banner";
import { useStore, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import RelaterProduct from "../Home/RelaterProduct/RelaterProduct";
import { addToCart } from "../../Action/Action";
import $ from 'jquery';
import moment from 'moment';
moment().format();

export default function Product() {

    const store = useStore();
    const dispatch = useDispatch();
    const [infoSinglePhone, setInfoSinglePhone] = useState([
        {
            idPhone: 2,
            variable: 'Đen',
            data: {
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816814848818566_oppo-reno7-z-den-1.jpg',
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816847409611807_oppo-reno7-z-den-3.jpg'
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
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
            }
        },
        {
            idPhone: 2,
            variable: 'Bạc',
            data: {
                img: [
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816815482886220_oppo-reno7-z-bac-1.jpg',
                    'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/2/28/637816845096624267_oppo-reno7-z-bac-3.jpg'
                ],
                title: 'OPPO Reno7 8GB-128GB',
                slug: 'oppo-reno-78gb-128gb',
                installment: '0',
                sale: 500000,
                price: 9590000,
                company: 'oppo',
                cost: 10190000,
                promotion: true,
                infophone: {
                    chip: 'Snapdragon 680',
                    screen: '6.4',
                    ram: '12',
                    memory: '128',
                },
            }
        }
    ]);
    const [itemsRelater, setItemsRelater] = useState([
        {
            img: [
                'https://images.fpt.shop/unsafe/fit-in/200x132/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/25/637707822857432352_00779950-vivo-y15s-trang-xanh-dd.jpg',
            ],
            title: 'Vivo Y15s 3GB - 32GB',
            slug: 'vivo-y15s-3gb-32gb',
            installment: '0',
            price: 3490000,
            company: 'oppo',
            promotion: true,
        },
        {
            img: [
                'https://images.fpt.shop/unsafe/fit-in/200x132/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/6/637874460472027520_oppo-reno7-4g-dd-2.jpg',
            ],
            title: 'OPPO Reno7 8GB-128GB',
            slug: 'oppo-reno78gb-128gb',
            installment: '0',
            price: 8990000,
            company: 'oppo',
            promotion: true,
        }
    ]);

    const [salientFeatures, setSalientFeatures] = useState([
        'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233261978253_oppo-reno7-z-chan-dung.png',
        'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233275415887_oppo-reno7-z-sac-nhanh.png',
        'https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/25/637838233274322124_oppo-reno7-z-thiet-ke.png',
    ]);

    const [variableProduct, setVariableProduct] = useState(0);
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
        content: '',
    });

    const [totalRate, setTotalRate] = useState([]);
    const [startRate, setStartRate] = useState({
        averageRating: '',
        listRow: {}
    });

    useEffect(() => {
        setTotalRate({
            totalStart: {
                start5: 47,
                start4: 5,
                start3: 1,
                start2: 0,
                start1: 0,
            },
            listCommentRate: [
                {
                    start: 4,
                    avt: 'NVT',
                    user: 'Nguyễn Vũ Thịnh',
                    title: 'Máy xài rất tốt',
                    createdAt: '2022-06-21T12:09:50.706+00:00'
                },
            ]
        });
    }, [])

    useEffect(() => {
        if (totalRate.length != 0) {

            setStartRate(e => {
                let data = { ...e };
                let totalStart = totalRate.totalStart ? totalRate.totalStart : {};
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

    const handleSendRate = () => {
        console.log(boxSendRate, 'boxSendRate');//send api ~ User //api
    }

    //END RATE

    //COMMENT

    const [handleReply, setHandleReply] = useState({
        status: false,
        content: '',
    })
    const [handleComment, setHandleComment] = useState({
        content: '',
    })
    const [dataComment, setDataComment] = useState([]);

    useEffect(() => {
        setDataComment([
            {
                id_comment: 1,
                idUser: 34,
                avt: 'NVT',
                user: 'Nguyễn Vũ Thịnh',
                isAdmin: false,
                title: 'Máy xài rất tốt',
                createdAt: '2022-06-21T13:09:50.706+00:00',
                listReply: [
                    {
                        idUser: 1,
                        avt: 'ADM',
                        user: 'Admin',
                        isAdmin: true,
                        title: 'Cảm ơn bạn',
                        createdAt: '2022-06-21T13:50:50.706+00:00',
                    }
                ]
            },
        ]);
    }, [])


    const handleSendComment = () => {
        console.log('handleSendComment', handleComment); //api
    }
    const handleReplyComment = (id_comment, idUser) => {
        console.log('handleReply', handleReply, id_comment, idUser);//api
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
        idPhone: ''
    });
    const [clickAddCart, setClickAddCart] = useState(true);

    useEffect(() => {
        setDataTotal(e => {
            let data = { ...e };
            data.idPhone = infoSinglePhone[variableProduct].idPhone;
            //selected
            data.selected['variable'] = infoSinglePhone[variableProduct].variable;
            data.selected['img'] = infoSinglePhone[variableProduct].data.img;
            data.selected['title'] = infoSinglePhone[variableProduct].data.title;
            data.selected['slug'] = infoSinglePhone[variableProduct].data.slug;
            data.selected['installment'] = infoSinglePhone[variableProduct].data.installment;
            data.selected['sale'] = infoSinglePhone[variableProduct].data.sale;
            data.selected['price'] = infoSinglePhone[variableProduct].data.price;
            data.selected['cost'] = infoSinglePhone[variableProduct].data.cost;
            data.selected['company'] = infoSinglePhone[variableProduct].data.company;
            data.selected['promotion'] = infoSinglePhone[variableProduct].data.promotion;
            data.selected['promotionChoose'] = choosePromotion;
            if (paymentMethods.moca) {
                data.selected['paymentCart'] = 'moca';
            }
            if (paymentMethods.vnp) {
                data.selected['paymentCart'] = 'vnp';
            }
            //end selected
            //dataTotal
            data.dataTotal['promotionChoose'] = listPromotion;
            data.dataTotal['totalSelect'] = infoSinglePhone;
            //end dataTotal

            return data;
        })
    }, [variableProduct, choosePromotion, paymentMethods, clickAddCart])

    const handleAddToCard = () => {
        setClickAddCart(!clickAddCart);
        setTimeout(() => {
            let addToCartRedux = addToCart(dataTotal);
            dispatch(addToCartRedux);
            console.log(infoSinglePhone[variableProduct], 'infoSinglePhone[variableProduct]');
        }, 800);
    }

    //END DATA SEND

    return (
        <div className="product_phone">
            <div className="title_phone">
                <h1>{infoSinglePhone[variableProduct].data.title}</h1>
                <div className="evaluate">
                    <div className="start">
                        <i className="fa-solid star-checked fa-star"></i>
                        <i className="fa-solid star-checked fa-star"></i>
                        <i className="fa-solid star-checked fa-star"></i>
                        <i className="fa-solid star-checked fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="total_comment">
                        <p>47 đánh giá</p>
                    </div>
                </div>
            </div>
            <div className="content_product">
                <div className="box_left_product">
                    <div className="slide_thumb_product">
                        <Banner dataBanner={infoSinglePhone[variableProduct].data.img} thisPage='Product' />
                    </div>
                    <div className="info_phone">
                        <ul>
                            <li className="chipset">
                                <i className="fa-solid fa-microchip"></i>
                                <p>{infoSinglePhone[variableProduct].data?.infophone?.chip}</p>
                            </li>
                            <li className="screen">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <p>{infoSinglePhone[variableProduct].data.infophone?.screen}inch</p>
                            </li>
                            <li className="ram">
                                <i className="fa-solid fa-memory"></i>
                                <p>{infoSinglePhone[variableProduct].data.infophone?.ram}GB</p>
                            </li>
                            <li className="memory">
                                <i className="fa-solid fa-sd-card"></i>
                                <p>{infoSinglePhone[variableProduct].data?.infophone?.memory}GB</p>
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
                    <h2>{infoSinglePhone[variableProduct].data.price}</h2>
                    <div className="list_ver_phone">
                        <ul>
                            {
                                infoSinglePhone.map((e, i) => {
                                    return (
                                        <li key={i} className={variableProduct == i ? `active` : ``} onClick={() => setVariableProduct(i)}>
                                            <span>
                                                <img src={e.data.img[0]} alt="" />
                                            </span>
                                            <p>{e.variable}</p>
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
                        <Link to='/buy'>
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
                            <h3>Đặc điểm nổi bật của {infoSinglePhone[variableProduct].data.title}</h3>
                            <Banner dataBanner={salientFeatures} />
                        </div>
                        <div className="text_content_more">
                            <h3>Đánh giá chi tiết {infoSinglePhone[variableProduct].data.title}</h3>
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
                                        <td>{infoSinglePhone[variableProduct].data.infophone?.screen}</td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>{infoSinglePhone[variableProduct].data.infophone?.chip}</td>
                                    </tr>
                                    <tr>
                                        <td>RAM</td>
                                        <td>{infoSinglePhone[variableProduct].data.infophone?.ram}</td>
                                    </tr>
                                    <tr>
                                        <td>Bộ nhớ</td>
                                        <td>{infoSinglePhone[variableProduct].data.infophone?.memory}</td>
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
                        <h3>Đánh giá nhận xét về {infoSinglePhone[0].data.title}</h3>
                        <div className="box_total_rate">
                            <div className="rate_1">
                                <h4>Đánh giá trung bình</h4>
                                <div className="number_rate_1">
                                    <span>{startRate.averageRating == 'start5' ? 5 : startRate.averageRating == 'start4' ? 4 : startRate.averageRating == 'start3' ? 3 : startRate.averageRating == 'start2' ? 2 : startRate.averageRating == 'start1' ? 1 : ''}</span>/<span>5</span>
                                </div>
                                <div className="start_1">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
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
                                    content: e.target.value
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
                                totalRate?.listCommentRate?.map((e, i) =>
                                    <li key={i}>
                                        <div className="thumb_user_rate">
                                            <div className="box_avata">{e.avt}</div>
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
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={``}
                                pageRangeDisplayed={5}
                                pageCount={5}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
                <div className="box_comment box_shadow">
                    <div className="container_box_comment">
                        <h2>Hỏi & Đáp về {infoSinglePhone[0].data.title}</h2>
                        <div className="box_send_comment">
                            <textarea name="send_comment" id="send_comment" cols="30" rows="10"
                                placeholder="Viết câu hỏi của bạn"
                                onChange={(e) => setHandleComment({
                                    content: e.target.value,
                                })}
                            ></textarea>
                            <p className="send_comment" onClick={() => handleSendComment()}>Gửi câu hỏi</p>
                        </div>
                        <div className="list_comment">
                            <ul>
                                {
                                    dataComment.map((e, i) =>
                                        <li key={i}>
                                            <div className="thumb_user_rate">
                                                <div className="box_avata">{e.avt}</div>
                                            </div>
                                            <div className="info_user_comment">
                                                <div className="name_comment">
                                                    <h4>{e.user} {e.isAdmin ? <span>Quản trị viên</span> : ''}</h4>
                                                    <p className="time_comment">{moment(e.createdAt).fromNow()}</p>
                                                </div>
                                                <div className="content_rate_text">
                                                    {e.title}
                                                </div>
                                                <div className="reply_box_title" onClick={() => { setHandleReply({ ...handleReply, status: true }); }}>
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
                                                <div className={`send_reply ${handleReply.status ? `` : `none`}`}>
                                                    <textarea name="send_reply" id="" cols="30" rows="10"
                                                        onChange={(m) => setHandleReply({
                                                            ...handleReply,
                                                            content: m.target.value,
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
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={``}
                                    pageRangeDisplayed={5}
                                    pageCount={5}
                                    previousLabel="<"
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