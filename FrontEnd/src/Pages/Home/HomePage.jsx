import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./home.scss";
import Banner from "../Other/Banner";
import Banner1 from '../../assets/img/banner1.webp';
import Banner2 from '../../assets/img/banner2.webp';
import Banner3 from '../../assets/img/banner3.webp';
import Apple from '../../assets/img/apple.png';
import Samsung from '../../assets/img/samsung.png';
import Vivo from '../../assets/img/vivo.png';
import Nokia from '../../assets/img/nokia.png';
import { Link } from "react-router-dom";
import ListHotPromotion from "./ListHotPromotion/ListHotPromotion";
import ProductList from "./ProductList/ProductList";
import { axiosJWT } from "../../AxiosJWT";
import { loginSuccess } from "../../Action/Action";
import { getAllCart } from "../api/ApiCart";
import { addToCart } from "../../Action/Action";
import { getAllProduct } from "../api/ApiProduct";
import { getAllSlidesCustom } from "../api/ApiSlidesCustom";
import { getAllNews } from "../api/ApiNews";
import { iconLoading } from "../svg/svg";


const HomePage = ({ handleRedirect }) => {

  const dispatch = useDispatch();
  const keyJwt = localStorage.getItem('token');
  const user = handleRedirect.userCurrentByToken;

  const [isLoading, setIsLoading] = useState(true);
  const [listBannerSlides, setListBannerSlides] = useState([{ thumb: Banner1, link: '' }, { thumb: Banner2, link: '' }, { thumb: Banner2, link: '' }]);
  const [listPromotion, setListPromotion] = useState([
    { src: Samsung, title: 'Samsung', url: 'samsung' },
    { src: Vivo, title: 'Vivo', url: 'vivo' },
    { src: Apple, title: 'Apple', url: 'apple' },
    { src: Nokia, title: 'Nokia', url: 'nokia' }
  ]);
  const [listNews, setListNews] = useState([]);
  const [listBanner, setListBanner] = useState([
    { thumb: 'https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/10/637877861412853482_F-H2_385x100.png' },
    { thumb: 'https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/1/637869969726431249_F-H2_385x100.png' },
  ]);

  //get all slides

  useEffect(() => {
    let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

    const fetchGetAllSlides = async () => {
      try {
        let data = await getAllSlidesCustom(keyJwt, axiosJwt);
        console.log('get all slides success', data);
        setListBannerSlides(data[0].slidesmain);
        setListBanner(data[0].bannermain);
        setIsLoading(false);

      } catch (error) {
        console.log('err get all slides 1');
        setIsLoading(false);
      }
    }
    fetchGetAllSlides();
  }, [])

  const [listHotPromotion, setListHotPromotion] = useState([]);

  //get list hot

  useEffect(() => {
    let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

    const fetchGetAllProduct = async () => {
      try {
        let data = await getAllProduct(keyJwt, axiosJwt);
        console.log('get all product success', data);
        setListHotPromotion(data);
      } catch (error) {
        console.log('err get all product 1');
      }
    }
    fetchGetAllProduct();
  }, [])


  //end get list hot

  //get all news

  useEffect(() => {
    let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

    const fetchGetAllNews = async () => {
      try {
        let data = await getAllNews(keyJwt, axiosJwt);
        console.log('get all NEWS success', data);
        setListNews(data);
      } catch (error) {
        console.log('err get all NEWS 1');
      }
    }
    fetchGetAllNews();
  }, [])

  useEffect(() => {
    handleRedirect.setCheckDirect(e => {
      let data = { ...e }
      data.user = true;
      return data;
    })
  }, [])

  useEffect(() => {
    let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
    const fetchGetAllCart = async () => {
      try {
        let data = await getAllCart(keyJwt, axiosJwt);
        let addToCartRedux = addToCart(data);
        dispatch(addToCartRedux);
        console.log('get all cart success 1', data);
      } catch (error) {
        console.log('get all cart err 1');
      }
    }
    fetchGetAllCart();
  }, [])



  return (
    <main className="home-container">
      {
        isLoading ? <div className="overlay_load">
          <span>{iconLoading}</span>
        </div> : ''
      }

      <div className="banner">
        <div className="container_main">
          <div className="container_banner box_shadow">
            <Banner dataBanner={listBannerSlides} listBannerSlides />
            <div className="content_right_banner">
              {
                listBanner?.map((e, i) =>
                  <div className="banner_1" key={i}>
                    <img src={e.url} alt="" />
                  </div>
                )
              }


              <div className="info_feature_banner">
                <div className="title_info">
                  <h4>Featured information</h4>
                  <Link to='/'>view more</Link>
                </div>
                <ul>
                  {
                    listNews.map((e, i) => {
                      return (
                        <li key={i}>
                          <Link to='/'>
                            <img src={`${e.avatar}`} alt="" />
                            <p>
                              {e.title}
                            </p>
                          </Link>
                        </li>
                      );
                    })
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container_main">
        <div className="section_1 hot_promotion">
          <div className="container_1 box_shadow">
            <ul className="list_hot_promotion companyphone">
              {
                listPromotion.map((e, i) => {
                  return (
                    <li key={i}>
                      <Link to={`/phone/${e.url}`}>
                        <img src={e.src} alt="" />
                        <h4>{e.title}</h4>
                      </Link>
                    </li>
                  );
                })
              }

            </ul>
          </div>
        </div>
        <div className="section_1 hot_promotion">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <i className="fa-solid fa-fire"></i>
              <h2>HOT PROMOTION</h2>
            </div>
            <ListHotPromotion list={listHotPromotion} />
          </div>
        </div>
        <div className="section_2 product_selling ma_bot_2">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Best selling phone</h2>
            </div>
            <ProductList list={listHotPromotion} />
          </div>
        </div>
        <div className="section_2 product_selling ma_bot_2">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Apple</h2>
            </div>
            <ProductList list={listHotPromotion} company='apple' />
          </div>
        </div>
        <div className="section_2 product_selling ma_bot_2">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Samsung</h2>
            </div>
            <ProductList list={listHotPromotion} company='samsung' />
          </div>
        </div>
        <div className="section_2 product_selling ma_bot_2">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Vivo</h2>
            </div>
            <ProductList list={listHotPromotion} company='vivo' />
          </div>
        </div>
        <div className="section_2 product_selling">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Nokia</h2>
            </div>
            <ProductList list={listHotPromotion} company='nokia' />
          </div>
        </div>
      </div>
    </main >
  );
};

export default HomePage;
