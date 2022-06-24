import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import OderCreate from '../DashBoard/Order/AddOrder';

export default function Router() {
    let location = window.location.pathname.split('/');
    const navigate = useNavigate();
    const userCurrent = useSelector(e => e.loginUser);
    const [checkDirect, setCheckDirect] = useState({
        user: true,
        dashBoard: true,
    });
    useEffect(() => {
        if (!userCurrent?.isLoggedIn && checkDirect.user) {
            setCheckDirect({ ...checkDirect, user: false });
            navigate('/login');
        }
    }, [checkDirect])
    let handleRedirect = {
        setCheckDirect
    };
    return (
        <>
            {
                location[1] != 'dashboard' ?
                    <>
                        <NavBar />
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
                            <HeaderDashBoard />
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