import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function ListHotPromotion({ list }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        className: 'list_hot_promotion product',
        centerPadding: 20,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>

            {/* <div className="list_hot_promotion product"> */}
            {
                list.map((e, i) => {
                    return (
                        <div className="li" key={i}>
                            <h3><span className="s1">SeaGame 31</span> <span className="s2">in Viet Nam</span></h3>
                            <div className="box_product_promotion">
                                <Link className="box_link_thumb" to={`/product/${e.slug}`}>
                                    <div className="thumb_box_promotion">
                                        <img src={e.variable.length > 0 ? e.variable[0].avatar : ''} alt="" />
                                        {
                                            e.installment ? <h4 className="title_sale_1">Trả góp {e.installment}%</h4> : ''
                                        }
                                        <h4 className="title_sale_2">Giảm giá {e.variable.length > 0 ? e.variable[0].sale : ''}đ</h4>
                                    </div>
                                </Link>
                                <Link to={`/product/${e.slug}`} className="title_product_sale">
                                    {e.title}
                                </Link>
                                <div className="price_box">
                                    <h3>{e.variable.length > 0 ? e.variable[0].price : ''}đ</h3>
                                    <p>{e.variable.length > 0 ? e.variable[0].cost : ''}đ</p>
                                </div>
                                <div className="bank">
                                    <ul>
                                        <li>
                                            <Link to='/'>
                                                <img src="https://images.fpt.shop/unsafe/fit-in/45x45/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/5/637637723581833310_637424313308028550_vnpay.jpg" alt="" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/'>
                                                <img src="https://images.fpt.shop/unsafe/fit-in/45x45/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/12/4/637426739557050119_logo-moca.png" alt="" />
                                            </Link>
                                        </li>
                                    </ul>
                                    <p className="sub_bank">
                                        Giảm thêm 500.000đ cho iPhone khi thanh toán qua VNPAY
                                    </p>
                                    <p className="sub_bank none">
                                        Giảm ngay 5% tối đa 400.000đ khi thanh toán qua ví Moca trên ứng dụng Grab
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }


            {/* </div> */}
        </Slider>
    );
}