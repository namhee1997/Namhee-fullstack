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
                                <Route path="/buy" element={`buy`} />
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
                                <Route path="/dashboard/user/edit/:id" element={<EditUser />} />
                                <Route path="/dashboard/user/create" element={<CreateUser />} />
                                <Route path="/dashboard/product" element={<ProductDashBoard />} />
                                <Route path="/dashboard/product/create" element={<ProductDashBoardCreate />} />
                                <Route path="/dashboard/product/edit/:slug" element={<ProductDashBoardEdit />} />
                                <Route path="/dashboard/company" element={<Company />} />
                                <Route path="/dashboard/company/create" element={<CompanyCreate />} />
                                <Route path="/dashboard/company/edit/:slug" element={<CompanyEdit />} />
                                <Route path="/dashboard/slides" element={<SlidesMain />} />
                                <Route path="/dashboard/news" element={<News />} />
                                <Route path="/dashboard/news/create" element={<NewsCreate />} />
                                <Route path="/dashboard/news/edit/:slug" element={<NewsEdit />} />
                                <Route path="/dashboard/order" element={<Oder />} />
                                <Route path="/dashboard/order/create" element={<OderCreate />} />
                            </Routes>
                        </div>
                        <Footer />

                    </Router>
            }

        </>
    );
}