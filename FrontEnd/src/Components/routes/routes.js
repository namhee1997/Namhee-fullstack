import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "../Home/HomePage";
import Login from "../Login/Login";
import LoginDashBoard from "../Login/LoginDashBoard";
import Register from "../Register/Register";
import NavBar from "../NavBar/NavBar";
import Footer from '../Footer';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import ListPhone from "../ListPhone/ListPhone";

import DashBoard from "../DashBoard/DashBoard";
import HeaderDashBoard from "../DashBoard/Header/Header";
import Users from "../DashBoard/Users/Users";
import CreateUser from '../DashBoard/Users/AddUsers';
import EditUser from '../DashBoard/Users/EditUser';
import ProductDashBoard from "../DashBoard/Product/Product";
import ProductDashBoardCreate from "../DashBoard/Product/AddProduct";
import ProductDashBoardEdit from "../DashBoard/Product/EditProduct";
import SlidesMain from "../DashBoard/SlidesMain/SlidesMain";
import Company from '../DashBoard/Company/Company';
import CompanyCreate from '../DashBoard/Company/AddCompany';
import CompanyEdit from '../DashBoard/Company/EditCompany';
import News from '../DashBoard/News/News';
import NewsCreate from '../DashBoard/News/AddNews';
import NewsEdit from '../DashBoard/News/EditNews';
import Oder from '../DashBoard/Order/Order';
import jwtDecode from 'jwt-decode';
import OderCreate from '../DashBoard/Order/AddOrder';
import { setJWT } from "../../Action/Action";

export default function Router() {
    let location = window.location.pathname.split('/');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenUserCurrent = (localStorage.getItem('token') || '');
    const [userCurrentByToken, setUserCurrentByToken] = useState({});
    const [checkLogOut, setCheckLogOut] = useState(false);
    const [checkDirect, setCheckDirect] = useState({
        user: true,
        dashBoard: true,
    });
    useEffect(() => {
        let getJwt = setJWT(localStorage.getItem('token'));
        dispatch(getJwt);
    }, [localStorage.getItem('token')]);
    useEffect(() => {
        if (location[1] != 'dashboard') {
            if (tokenUserCurrent == '' && checkDirect.user) {
                setCheckDirect({ ...checkDirect, user: false });
                navigate('/login');
            } else if (tokenUserCurrent != '' && tokenUserCurrent && tokenUserCurrent != undefined && tokenUserCurrent != 'undefined') {
                setCheckLogOut(false);

                let decodeToken = jwtDecode(tokenUserCurrent);
                setUserCurrentByToken(decodeToken);
                let date = new Date();
                if (decodeToken.exp < date.getTime() / 1000) {
                    navigate('/login');
                }
            }
        } else {
            if (tokenUserCurrent == '' && checkDirect.dashBoard) {
                setCheckDirect({ ...checkDirect, dashBoard: false });
                navigate('/dashboard/login');
            } else if (tokenUserCurrent != '' && tokenUserCurrent && tokenUserCurrent != undefined && tokenUserCurrent != 'undefined') {
                setUserCurrentByToken(jwtDecode(tokenUserCurrent));
                let data = jwtDecode(tokenUserCurrent);
                if (data?.role == 'admin') {
                    if (data?.isDashBoard) {
                        setCheckLogOut(false);
                        let decodeToken = jwtDecode(tokenUserCurrent);
                        let date = new Date();
                        if (decodeToken.exp < date.getTime() / 1000) {
                            navigate('/login');
                        }
                    }
                } else {
                    setCheckLogOut(false);
                    let decodeToken = jwtDecode(tokenUserCurrent);
                    let date = new Date();
                    if (decodeToken.exp < date.getTime() / 1000) {
                        navigate('/login');
                    } else {
                        navigate('/');
                    }
                }
            }
        }

    }, [checkDirect])

    // console.log(userCurrentByToken, 'userCurrentByToken');

    let handleRedirect = {
        setCheckDirect,
        userCurrentByToken
    };
    let handleRefresh = { setCheckLogOut, checkLogOut };
    console.log(location, 'location');
    return (
        <>
            {
                location[1] != 'dashboard' ?
                    <>
                        {
                            location[1] != "login" ? <NavBar userCurrent={userCurrentByToken} refresh={handleRefresh} /> : ''
                        }

                        <div className="App">
                            <Routes>
                                <Route path="/product/:slug" element={<Product handleRedirect={handleRedirect} />} />
                                <Route path="/phone/:slug" element={<ListPhone handleRedirect={handleRedirect} />} />
                                <Route path="/" element={<HomePage handleRedirect={handleRedirect} />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/cart" element={<Cart handleRedirect={handleRedirect} />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </div>
                        <Footer />
                    </>

                    : <>
                        <div className="DashBoard">
                            {
                                location[2] != "login" ? <HeaderDashBoard userCurrent={userCurrentByToken} /> : ''
                            }

                            <Routes>
                                <Route path="/dashboard" element={<DashBoard handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/login" element={<LoginDashBoard />} />
                                <Route path="/dashboard/dashboard" element={<DashBoard handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/user" element={<Users handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/user/edit/:id" element={<EditUser handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/user/create" element={<CreateUser handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/product" element={<ProductDashBoard handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/product/create" element={<ProductDashBoardCreate handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/product/edit/:slug" element={<ProductDashBoardEdit handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/company" element={<Company handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/company/create" element={<CompanyCreate handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/company/edit/:slug" element={<CompanyEdit handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/slides" element={<SlidesMain handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/news" element={<News handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/news/create" element={<NewsCreate handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/news/edit/:slug" element={<NewsEdit handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/order" element={<Oder handleRedirect={handleRedirect} />} />
                                <Route path="/dashboard/order/create" element={<OderCreate handleRedirect={handleRedirect} />} />
                            </Routes>
                        </div>
                        <Footer />
                    </>

            }

        </>
    );
}