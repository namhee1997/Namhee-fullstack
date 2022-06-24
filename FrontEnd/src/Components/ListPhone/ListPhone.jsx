import { useState, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
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
import { Link, useParams } from "react-router-dom";
import ProductList from "../Home/ProductList/ProductList";


export default function ListPhone({ handleRedirect }) {
    const params = useParams();
    const store = useStore();
    const [listBanner, setListBanner] = useState([{ thumb: Banner1, link: '' }, { thumb: Banner2, link: '' }, { thumb: Banner2, link: '' }]);
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.user = true;
            return data;
        })
    }, [])
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
    const [dataPhone, setDataPhone] = useState([]);
    const [sort, setSort] = useState('min');
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        setDataPhone(store.getState().dataState.data);
    }, [])

    useEffect(() => {
        dataPhone.sort(function (a, b) {
            if (sort == 'max') {
                return a.price - b.price;
            }
            if (sort == 'min') {
                return b.price - a.price;
            }
        });
    }, [dataPhone, sort])

    useEffect(() => {
        setChange({
            ...change,
            company: params.slug
        });
    }, [params])



    //CHANGE ONE 
    const [change, setChange] = useState({
        company: 'allcompany',
        price: 'allprice',
        ram: 'allram',
        memory: 'allmemory',
    });

    //END CHANGE ONE

    //GET DATA SEND API
    useEffect(() => {
        console.log(change, 'change');
    }, [change])

    //END GET DATA SEND API

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
                                                    <input type="checkbox" id={e.slug}
                                                        checked={change.company == e.slug}
                                                        name='company'
                                                        onChange={() => setChange({
                                                            ...change,
                                                            company: e.slug
                                                        })}
                                                    />
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
                                                    <input type="checkbox" id={e.slug}
                                                        checked={change.price == e.slug}
                                                        onChange={() => setChange({
                                                            ...change,
                                                            price: e.slug
                                                        })}
                                                    />
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
                                                    <input type="checkbox" id={e.slug}
                                                        checked={change.ram == e.slug}
                                                        onChange={() => setChange({
                                                            ...change,
                                                            ram: e.slug
                                                        })}
                                                    />
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
                                                    <input type="checkbox" id={e.slug}
                                                        checked={change.memory == e.slug}
                                                        onChange={() => setChange({
                                                            ...change,
                                                            memory: e.slug
                                                        })}
                                                    />
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
                                    <p className={sort == 'min' ? 'active' : ''} onClick={() => setSort('min')}>
                                        Giá thấp
                                    </p>
                                    <p className={sort == 'max' ? 'active' : ''} onClick={() => setSort('max')}>
                                        Giá cao
                                    </p>
                                </div>
                                <div className="box_right_sort">
                                    <div className={`layout_views ${layout == 'grid' ? `active` : ``}`}
                                        onClick={() => setLayout('grid')}
                                    >
                                        <i className="fa-solid fa-table-cells"></i>
                                    </div>
                                    <div className={`list_views ${layout == 'list' ? `active` : ``}`}
                                        onClick={() => setLayout('list')}
                                    >
                                        <i className="fa-solid fa-list"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="items_result layout">
                                <ProductList list={dataPhone} layout={layout} />
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