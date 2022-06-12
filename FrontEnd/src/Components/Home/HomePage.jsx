import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
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

const HomePage = () => {
  const [listBanner, setListBanner] = useState([{ thumb: Banner1, link: '' }, { thumb: Banner2, link: '' }, { thumb: Banner2, link: '' }]);
  const [listPromotion, setListPromotion] = useState([
    { src: Samsung, title: 'Samsung', url: 'samsung' },
    { src: Vivo, title: 'Vivo', url: 'vivo' },
    { src: Apple, title: 'Apple', url: 'apple' },
    { src: Nokia, title: 'Nokia', url: 'nokia' }
  ]);
  const [listFeatureBanner, setListFeatureBanner] = useState([
    {
      img: 'https://images.fpt.shop/unsafe/fit-in/70x40/filters:quality(90):fill(white)/https://fptshop.com.vn/Uploads/images/2015/CTKM-Voucher/sieu%20sale/70x40(1).png',
      title: 'Tuần lễ Xiaomi giảm sốc đến 40%'
    },
    {
      img: 'https://images.fpt.shop/unsafe/fit-in/70x40/filters:quality(90):fill(white)/https://fptshop.com.vn/Uploads/images/2015/PhuongMT5/FPT-0.png',
      title: 'Nhận ngay Voucher 50.000Đ'
    }
  ]);

  const listHotPromotion = useSelector(e => e.dataState.data);



  return (
    <main className="home-container">
      <div className="banner">
        <div className="container_main">
          <div className="container_banner box_shadow">
            <Banner dataBanner={listBanner} />
            <div className="content_right_banner">
              <div className="banner_1">
                <img src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/10/637877861412853482_F-H2_385x100.png" alt="" />
              </div>
              <div className="banner_1">
                <img src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/5/1/637869969726431249_F-H2_385x100.png" alt="" />
              </div>
              <div className="info_feature_banner">
                <div className="title_info">
                  <h4>Featured information</h4>
                  <Link to='/'>view more</Link>
                </div>
                <ul>
                  {
                    listFeatureBanner.map((e, i) => {
                      return (
                        <li key={i}>
                          <Link to='/'>
                            <img src={`${e.img}`} alt="" />
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
        <div className="section_2 product_selling">
          <div className="container_1 box_shadow">
            <div className="title_1">
              <h2>Vivo</h2>
            </div>
            <ProductList list={listHotPromotion} company='vivo' />
          </div>
        </div>
      </div>
    </main >
  );
};

export default HomePage;
