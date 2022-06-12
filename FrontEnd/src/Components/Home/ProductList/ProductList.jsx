import { Link } from "react-router-dom";

export default function ProductList({ list, company = true }) {

    return (

        <div className="list_hot_promotion product product_selling">
            {
                list.map((e, i) => {
                    if (company == e.company || company == true)
                        return (
                            <div className={`li ${e.promotion ? `` : `not-sale`}`} key={i}>
                                <h3><span className="s1">SeaGame 31</span> <span className="s2">in Viet Nam</span></h3>
                                <div className="box_product_promotion">
                                    <Link className="box_link_thumb" to={`/product/${e.slug}`}>
                                        <div className="thumb_box_promotion">
                                            <img src={e.img} alt="" />
                                            {
                                                e.installment ? <h4 className="title_sale_1">Trả góp {e.installment}%</h4> : ''
                                            }
                                            <h4 className="title_sale_2">Giảm giá {e.sale}đ</h4>
                                        </div>
                                    </Link>
                                    <Link to={`/product/${e.slug}`} className="title_product_sale">
                                        {e.title}
                                    </Link>
                                    <div className="price_box">
                                        <h3>{e.price}đ</h3>
                                        <p>{e.cost}đ</p>
                                    </div>
                                    <div className="info_phone">
                                        <ul className="list_info_phone">
                                            <li className="chipset">
                                                <i className="fa-solid fa-microchip"></i>
                                                <p>{e?.infophone?.chip}</p>
                                            </li>
                                            <li className="screen">
                                                <i className="fa-solid fa-mobile-screen"></i>
                                                <p>{e?.infophone?.screen}</p>
                                            </li>
                                            <li className="ram">
                                                <i className="fa-solid fa-memory"></i>
                                                <p>{e?.infophone?.ram}</p>
                                            </li>
                                            <li className="memory">
                                                <i className="fa-solid fa-sd-card"></i>
                                                <p>{e?.infophone?.memory}</p>
                                            </li>
                                        </ul>
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


        </div>
    );
}