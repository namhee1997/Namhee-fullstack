import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate';
import Banner from "../Other/Banner";
import Banner1 from '../../assets/img/banner1.webp';
import Banner2 from '../../assets/img/banner2.webp';
import Banner3 from '../../assets/img/banner3.webp';
import BannerLogo from '../Other/BannerLogo';
import Apple from '../../assets/img/apple.png';
import Samsung from '../../assets/img/samsung.png';
import Vivo from '../../assets/img/vivo.png';
import Nokia from '../../assets/img/nokia.png';
import { Link } from "react-router-dom";
import ProductList from "../Home/ProductList/ProductList";


export default function ListPhone() {

    const [listBanner, setListBanner] = useState([{ thumb: Banner1, link: '' }, { thumb: Banner2, link: '' }, { thumb: Banner2, link: '' }]);

    const [company, setCompany] = useState([
        { name: 'Tất cả', slug: 'allcompany' },
        { name: 'Apple', slug: 'apple' },
        { name: 'Samsung', slug: 'samsung' },
        { name: 'Vivo', slug: 'vivo' },
        { name: 'Nokia', slug: 'nokia' },
    ]);
    const [priceSearch, setPriceSearch] = useState([
        { name: 'Tất cả', slug: 'allprice' },
        { name: 'Dưới 2 triệu', slug: '<2' },
        { name: 'Từ 2 đến 4 triệu', slug: '2-4' },
        { name: 'Từ 4 đến 7 triệu', slug: '4-7' },
        { name: 'Từ 7 đến 12 triệu', slug: '7-12' },
        { name: 'Trên 12 triệu', slug: '>12' },
    ]);
    const [ram, setRam] = useState([
        { name: 'Tất cả', slug: 'allram' },
        { name: '2GB', slug: '2GB' },
        { name: '4GB', slug: '4GB' },
        { name: '6GB', slug: '6GB' },
        { name: '8GB', slug: '8GB' },
    ]);
    const [memory, setMemory] = useState([
        { name: 'Tất cả', slug: 'allmemory' },
        { name: '16GB', slug: '16GB' },
        { name: '32GB', slug: '32GB' },
        { name: '64GB', slug: '64GB' },
        { name: '128GB', slug: '128GB' },
    ]);
    const [listPhone, setListPhone] = useState([
        { src: Samsung, title: 'Samsung', url: 'samsung' },
        { src: Vivo, title: 'Vivo', url: 'vivo' },
        { src: Apple, title: 'Apple', url: 'apple' },
        { src: Nokia, title: 'Nokia', url: 'nokia' }
    ]);
    const [totalProduct, setTotalProduct] = useState(0);

    const dataPhone = useSelector(e => e.dataState.data);

    return (
        <div className="container_phone">
            <div className="banner_phone">
                <Banner dataBanner={listBanner} />
            </div>
            <div className="box_flex_phone">
                <div className="box_left_phone">
                    <div className="box_search_phone">
                        <h3>Hãng sản xuất</h3>
                        <div className="left_box_search">
                            <ul>
                                {
                                    company.map((e, i) => {
                                        return (
                                            <li key={i}>
                                                <div className="content_search">
                                                    <input type="checkbox" id={e.slug} />
                                                    <label htmlFor={e.slug}>{e.name}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="box_search_phone">
                        <h3>Mức giá</h3>
                        <div className="left_box_search">
                            <ul>
                                {
                                    priceSearch.map((e, i) => {
                                        return (
                                            <li key={i}>
                                                <div className="content_search">
                                                    <input type="checkbox" id={e.slug} />
                                                    <label htmlFor={e.slug}>{e.name}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="box_search_phone">
                        <h3>Ram</h3>
                        <div className="left_box_search">
                            <ul>
                                {
                                    ram.map((e, i) => {
                                        return (
                                            <li key={i}>
                                                <div className="content_search">
                                                    <input type="checkbox" id={e.slug} />
                                                    <label htmlFor={e.slug}>{e.name}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="box_search_phone">
                        <h3>Dung lượng</h3>
                        <div className="left_box_search">
                            <ul>
                                {
                                    memory.map((e, i) => {
                                        return (
                                            <li key={i}>
                                                <div className="content_search">
                                                    <input type="checkbox" id={e.slug} />
                                                    <label htmlFor={e.slug}>{e.name}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="box_right_phone">
                    <div className="list_phone_right">
                        <div className="slide_logo_phone box_shadow">
                            <h3>Điện thoại <span>({totalProduct} sản phẩm)</span></h3>
                            <div className="container_side_phone">
                                <BannerLogo dataBanner={listPhone} />

                            </div>
                        </div>
                        <div className="list_items_phone box_shadow">
                            <div className="sort_items_phone">
                                <div className="box_left_sort">
                                    <span>
                                        Ưu tiên xem:
                                    </span>
                                    <p className="active">
                                        Giá thấp
                                    </p>
                                    <p>
                                        Giá cao
                                    </p>
                                </div>
                                <div className="box_right_sort">
                                    <div className="layout_views active">
                                        <i className="fa-solid fa-table-cells"></i>
                                    </div>
                                    <div className="list_views">
                                        <i className="fa-solid fa-list"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="items_result layout">
                                <ProductList list={dataPhone} />
                            </div>
                        </div>
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
    );
}