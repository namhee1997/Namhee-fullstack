import React from "react";
import HomePage from "../Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NavBar from "../NavBar/NavBar";
import Footer from '../Footer';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import ListPhone from "../ListPhone/ListPhone";

import DashBoard from "../DashBoard/DashBoard";
import HeaderDashBoard from "../DashBoard/Header/Header";
import Users from "../DashBoard/Users/Users";
import ProductDashBoard from "../DashBoard/Product/Product";
import SlidesMain from "../DashBoard/SlidesMain/SlidesMain";
import Company from '../DashBoard/Company/Company';
import News from '../DashBoard/News/News';
import Oder from '../DashBoard/Order/Order';

export default function router() {
    let location = window.location.pathname.split('/');

    return (
        <>
            {
                location[1] != 'dashboard' ?
                    <Router>
                        <NavBar />
                        <div className="App">
                            <Routes>
                                <Route path="/product/:slug" element={<Product />} />
                                <Route path="/phone/:slug" element={<ListPhone />} />
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                    : <Router>
                        <div className="DashBoard">
                            <HeaderDashBoard />
                            <Routes>
                                <Route path="/dashboard" element={<DashBoard />} />
                                <Route path="/dashboard/dashboard" element={<DashBoard />} />
                                <Route path="/dashboard/user" element={<Users />} />
                                <Route path="/dashboard/product" element={<ProductDashBoard />} />
                                <Route path="/dashboard/company" element={<Company />} />
                                <Route path="/dashboard/slides" element={<SlidesMain />} />
                                <Route path="/dashboard/news" element={<News />} />
                                <Route path="/dashboard/order" element={<Oder />} />
                            </Routes>
                        </div>
                        <Footer />

                    </Router>
            }

        </>
    );
}