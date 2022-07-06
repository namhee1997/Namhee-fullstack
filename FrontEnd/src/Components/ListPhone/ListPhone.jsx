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
import jwtDecode from 'jwt-decode';
import ProductList from "../Home/ProductList/ProductList";
import { axiosJWT } from '../../AxiosJWT';
import { loginSuccess } from '../../Action/Action';
import { getAllProduct } from '../api/ApiProduct';
import { getAllSlidesCustom } from '../api/ApiSlidesCustom';
import { iconLoading } from '../svg/svg';


export default function ListPhone({ handleRedirect }) {
    const params = useParams();
    const store = useStore();

    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);

    const [isLoading, setIsLoading] = useState(true);
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
    const [isSort, setisSort] = useState('');
    const [layout, setLayout] = useState('grid');



    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

        const fetchGetAllProduct = async () => {
            try {
                let data = await getAllProduct(keyJwt, axiosJwt);
                setIsLoading(false);
                console.log('get all product success', data);
                setDataPhone(data);
            } catch (error) {
                console.log('err get all product 1');
                setIsLoading(false);
            }
        }
        fetchGetAllProduct();
    }, [])

    //get all slides

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

        const fetchGetAllSlides = async () => {
            try {
                let data = await getAllSlidesCustom(keyJwt, axiosJwt);
                console.log('get all slides success', data);
                setListBanner(data[0].slidespage);
            } catch (error) {
                console.log('err get all slides 1');
            }
        }
        fetchGetAllSlides();
    }, [])

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

    //PAGING
    const [offsetPagingProduct, setOffsetPagingProduct] = useState(0);
    const [dataPagingProduct, setDataPagingProduct] = useState([]);
    const [perPageProduct] = useState(9);
    const [pageCountPagingProduct, setPageCountPagingProduct] = useState(0);
    const [handlePaGingClick, setHandlePaGingClick] = useState(true);

    const [handleReadyPaging, setHandleReadyPaging] = useState(false);
    const [dataFilter, setDataFilter] = useState([]);


    useEffect(() => {
        dataPhone.sort(function (a, b) {
            if (sort == 'max') {
                return a.variable[0].price - b.variable[0].price;
            }
            if (sort == 'min') {
                return b.variable[0].price - a.variable[0].price;
            }
        });
    }, [dataPhone, sort])

    useEffect(() => {
        if (handleReadyPaging) {

            setPageCountPagingProduct(Math.ceil(dataFilter.length / perPageProduct));
            let slice = dataFilter?.slice(offsetPagingProduct, offsetPagingProduct + perPageProduct)
            setDataPagingProduct(slice);
            setHandleReadyPaging(false);
        }
    }, [dataPhone, handlePaGingClick, params, handleReadyPaging])

    useEffect(() => {
        if (Object.keys(dataPhone).length > 0) {
            let data = [...dataPhone];
            let dataResult = [];
            data.map((e, i) => {
                if (change.price == 'allprice') {
                    if (change.company == 'allcompany') {
                        dataResult.push(e);
                    } else {
                        if (e.company == change.company) {
                            dataResult.push(e);
                        }
                    }
                } else if (change.price == '<2') {
                    if (e.variable[0].price < 2000000) {
                        if (change.company == 'allcompany') {
                            dataResult.push(e);
                        } else {
                            if (e.company == change.company) {
                                dataResult.push(e);
                            }
                        }
                    }
                } else if (change.price == '2-4') {
                    if (e.variable[0].price >= 2000000 && e.variable[0].price <= 4000000) {
                        if (change.company == 'allcompany') {
                            dataResult.push(e);
                        } else {
                            if (e.company == change.company) {
                                dataResult.push(e);
                            }
                        }
                    }
                } else if (change.price == '4-7') {
                    if (e.variable[0].price >= 4000000 && e.variable[0].price <= 7000000) {
                        if (change.company == 'allcompany') {
                            dataResult.push(e);
                        } else {
                            if (e.company == change.company) {
                                dataResult.push(e);
                            }
                        }
                    }
                } else if (change.price == '7-12') {
                    if (e.variable[0].price >= 7000000 && e.variable[0].price <= 12000000) {
                        if (change.company == 'allcompany') {
                            dataResult.push(e);
                        } else {
                            if (e.company == change.company) {
                                dataResult.push(e);
                            }
                        }
                    }
                } else if (change.price == '>12') {
                    if (e.variable[0].price >= 12000000) {
                        if (change.company == 'allcompany') {
                            dataResult.push(e);
                        } else {
                            if (e.company == change.company) {
                                dataResult.push(e);
                            }
                        }
                    }
                }
            })
            if (isSort != '') {
                dataResult.sort(function (a, b) {
                    if (sort == 'max') {
                        return a.variable[0].price - b.variable[0].price;
                    }
                    if (sort == 'min') {
                        return b.variable[0].price - a.variable[0].price;
                    }
                });
            }
            setDataFilter(dataResult);
            setHandleReadyPaging(true);
        }
    }, [dataPhone, change, isSort])

    const handleClickRatePaGing = (e) => {
        let selectedPage = e.selected;
        setOffsetPagingProduct(selectedPage * perPageProduct);
        setHandleReadyPaging(true);
        setHandlePaGingClick(!handlePaGingClick);
    };

    return (
        <div className="container_phone">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <div className="banner_phone">
                <Banner dataBanner={listBanner} listBannerSlides />
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
                                                        onChange={() => {
                                                            setChange({
                                                                ...change,
                                                                company: e.slug
                                                            });
                                                            setOffsetPagingProduct(0);
                                                        }}
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
                                                        onChange={() => {
                                                            setChange({
                                                                ...change,
                                                                price: e.slug
                                                            });
                                                            setOffsetPagingProduct(0);
                                                        }}
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
                    {/* <div className="box_search_phone">
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
                    </div> */}
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
                                    <p className={isSort == 'min' ? 'active' : ''}
                                        onClick={() => {
                                            setSort('min');
                                            setisSort('min');
                                        }}>
                                        Giá cao
                                    </p>
                                    <p className={isSort == 'max' ? 'active' : ''}
                                        onClick={() => {
                                            setSort('max');
                                            setisSort('max');
                                        }}>

                                        Giá thấp
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
                                <ProductList list={dataPagingProduct} layout={layout} />
                            </div>
                        </div>
                        <div className="list_pagination">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                pageCount={pageCountPagingProduct}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handleClickRatePaGing}
                                renderOnZeroPageCount={null}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}