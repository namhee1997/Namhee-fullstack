import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../api/ApiUser";
import jwtDecode from 'jwt-decode';
import { axiosJWT } from "../../../AxiosJWT";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../Action/Action";
import { deleteProduct } from "../../api/ApiProduct";
import { deleteCompany } from "../../api/ApiCompany";
import { deleteNews } from "../../api/ApiNews";
import { deleteOrderSuccess } from "../../api/ApiOrderSuccess";
import { deleteOrderUser } from "../../api/ApiOrderUser";


export default function Table({ title = '', dataCurrent = [],
    dataTitle = [], thisPage = '',
    linkCreate = '', dataHandle, create = 'true', handleReRender }) {

    const keyJwt = localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = jwtDecode(keyJwt);

    const fetchDeleteUser = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteUser(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }

    const fetchDeleteProduct = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteProduct(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }

    const fetchDeleteCompany = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteCompany(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }

    const fetchDeleteNews = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteNews(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }

    const fetchDeleteOrderSuccess = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteOrderSuccess(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }

    const fetchDeleteOrderUser = async (e, id) => {
        e.preventDefault();
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        try {
            let data = await deleteOrderUser(keyJwt, axiosJwt, id);
            handleReRender.setReRender(e => !e);
        } catch (error) {
            console.log('delete err');
        }
    }


    return (
        <div className="card mb-4 table_">
            <div className="card-header d-flex align-items-center header_table">
                <div className="box_title_table">
                    <i className="fas fa-table me-2"></i>
                    <p>{title}</p>
                </div>

                {
                    create == 'true' ?
                        <button type="button" className="btn btn-primary ms-auto">
                            <Link to={linkCreate} className="text-white text-decoration-none">
                                <i className="fa-solid fa-plus"></i> Create
                            </Link>
                        </button>
                        : ""
                }

            </div>
            <div className="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>STT</th>
                            {
                                dataTitle.map((e, i) =>
                                    <th key={i}>{e}</th>
                                )
                            }
                            <th width={thisPage == 'Order' ? '150px' : '100px'}></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            thisPage == 'User' ?
                                dataCurrent.map((e, i) =>
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {e.username}
                                        </td>
                                        <td>
                                            {e.role}
                                        </td>
                                        <td>
                                            {e.fullname}
                                        </td>
                                        <td>
                                            <img height="100px" width="100px" src={e.avatar} alt="" />

                                        </td>
                                        <td>
                                            {e.address}
                                        </td>
                                        <td>
                                            {e.email}
                                        </td>
                                        <td>
                                            {e.phone}
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-danger">
                                                    <Link to={`/dashboard/user/delete/${e.userId}`} onClick={(z) => fetchDeleteUser(z, e.userId)}>
                                                        <i className="fa-solid fa-trash-can text-white"></i>
                                                    </Link>
                                                </button>
                                                <button type="button" className="btn btn-primary">
                                                    <Link to={`/dashboard/user/edit/${e.userId}`}>
                                                        <i className="fa-solid fa-pen-to-square text-white"></i>
                                                    </Link>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : thisPage == 'Product' ?
                                    dataCurrent.map((e, i) =>
                                        <tr key={i}>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                {e?.title}
                                            </td>
                                            <td>
                                                {e.slug}
                                            </td>
                                            <td>
                                                {e.variable[0].sale}
                                            </td>
                                            <td>
                                                {e.variable[0].price}
                                            </td>
                                            <td>
                                                <img height="100px" width="100px" src={e.variable[0].avatar} alt="" />

                                            </td>
                                            <td>
                                                {e.variable[0].cost}
                                            </td>
                                            <td>
                                                {e.promotion ? 'true' : 'false'}
                                            </td>
                                            <td>
                                                {e.company}
                                            </td>
                                            <td>
                                                {
                                                    e.variable.map((r, x) => {
                                                        return (
                                                            <p key={x}>
                                                                {r.title}
                                                            </p>
                                                        );
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <p>{e?.infophone?.chip}</p>
                                                <p>{e?.infophone?.screen}</p>
                                                <p>{e?.infophone?.ram}</p>
                                                <p>{e?.infophone?.memory}</p>

                                            </td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-danger">
                                                        <Link to={`/dashboard/product/delete/${e.slug}`}
                                                            onClick={(b) => fetchDeleteProduct(b, e._id)}>
                                                            <i className="fa-solid fa-trash-can text-white"></i>
                                                        </Link>
                                                    </button>
                                                    <button type="button" className="btn btn-primary">
                                                        <Link to={`/dashboard/product/edit/${e.slug}`}>
                                                            <i className="fa-solid fa-pen-to-square text-white"></i>
                                                        </Link>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    : thisPage == 'Company' ?
                                        dataCurrent.map((e, i) =>
                                            <tr key={i}>
                                                <td>
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    {e.title}
                                                </td>
                                                <td>
                                                    {e.slug}
                                                </td>

                                                <td>
                                                    <img height="100px" width="100px" src={e.src} alt="" />

                                                </td>

                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button type="button" className="btn btn-danger">
                                                            <Link to={`/dashboard/company/delete/${e.slug}`} onClick={(v) => fetchDeleteCompany(v, e._id)}>
                                                                <i className="fa-solid fa-trash-can text-white"></i>
                                                            </Link>
                                                        </button>
                                                        <button type="button" className="btn btn-primary">
                                                            <Link to={`/dashboard/company/edit/${e.slug}`}>
                                                                <i className="fa-solid fa-pen-to-square text-white"></i>
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        : thisPage == 'News' ?
                                            dataCurrent.map((e, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        {i + 1}
                                                    </td>

                                                    <td>
                                                        {e.title}
                                                    </td>
                                                    <td>
                                                        {e.slug}
                                                    </td>
                                                    <td>
                                                        {e.content}
                                                    </td>
                                                    <td>
                                                        {e.urlto}
                                                    </td>
                                                    <td>
                                                        <img height="100px" width="100px" src={e.avatar} alt="" />
                                                    </td>


                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" className="btn btn-danger">
                                                                <Link to={`/dashboard/news/delete/${e.slug}`}
                                                                    onClick={(zx) => fetchDeleteNews(zx, e._id)}>
                                                                    <i className="fa-solid fa-trash-can text-white"></i>
                                                                </Link>
                                                            </button>
                                                            <button type="button" className="btn btn-primary">
                                                                <Link to={`/dashboard/news/edit/${e.slug}`}>
                                                                    <i className="fa-solid fa-pen-to-square text-white"></i>
                                                                </Link>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            : thisPage == 'Order' ?
                                                dataCurrent.map((e, i) =>
                                                    <tr key={i}>
                                                        <td>
                                                            {i + 1}
                                                        </td>
                                                        {/* <td>
                                                            {e.idorder}
                                                        </td> */}
                                                        <td>
                                                            {e.slug}
                                                        </td>
                                                        <td>
                                                            {e.title}
                                                        </td>
                                                        <td>
                                                            {e.price}
                                                        </td>
                                                        <td>
                                                            {e?.cost - e?.price || 0}
                                                        </td>
                                                        <td>
                                                            {e.cost}
                                                        </td>
                                                        <td>
                                                            {e.userbuy}
                                                        </td>
                                                        <td>
                                                            {e.paid ? 'true' : 'false'}
                                                        </td>

                                                        <td>
                                                            <div className={`btn-group this_order`} role="group" aria-label="Basic example">
                                                                <button type="button" className="btn btn-danger">
                                                                    <Link to={``}
                                                                        onClick={(z) => {
                                                                            z.preventDefault();
                                                                            dataHandle.handleRemoveTable(e.idOrder);
                                                                            fetchDeleteOrderUser(z, e._id);
                                                                        }}
                                                                    >
                                                                        <i className="fa-solid fa-trash-can text-white"></i>
                                                                    </Link>
                                                                </button>
                                                                {
                                                                    create == 'true' ?
                                                                        <button type="button" className="btn btn-primary">
                                                                            <Link to={`/dashboard/order/edit/${e.idOrder}`}>
                                                                                <i className="fa-solid fa-pen-to-square text-white"></i>
                                                                            </Link>
                                                                        </button>
                                                                        : ''
                                                                }
                                                                {
                                                                    create == 'false' ?
                                                                        <button className="btn btn-success" onClick={() => dataHandle.setViewBox(m => {
                                                                            let data = {};
                                                                            data.userID = e.userbuy;
                                                                            data.view = !m.view;
                                                                            data.idOrder = e.idorder;
                                                                            return data;
                                                                        })}>
                                                                            <i className="fa-solid fa-eye"></i>
                                                                        </button>
                                                                        : ''
                                                                }

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                                : thisPage == 'Order-Custom' ?
                                                    dataCurrent.map((e, i) =>
                                                        <tr key={i}>
                                                            <td>
                                                                {i + 1}
                                                            </td>
                                                            <td>
                                                                {e.title}
                                                            </td>
                                                            {/* <td>
                                                                {e.name}
                                                            </td> */}
                                                            <td>
                                                                {e.fullname}
                                                            </td>
                                                            <td>
                                                                {e.price}
                                                            </td>
                                                            <td>
                                                                {e.address}
                                                            </td>
                                                            <td>
                                                                {e.promotion}
                                                            </td>
                                                            <td>
                                                                {e.company}
                                                            </td>
                                                            <td>
                                                                {e.phone}
                                                            </td>
                                                            <td>
                                                                <div className={`btn-group this_order`} role="group" aria-label="Basic example">
                                                                    <button type="button" className="btn btn-danger">
                                                                        <Link to={`/dashboard/order/delete/${e.idOrder}`}
                                                                            onClick={(z) => {
                                                                                z.preventDefault();
                                                                                dataHandle.handleRemoveTableCustom(e.idOderCustom);
                                                                                fetchDeleteOrderSuccess(z, e._id)
                                                                            }}
                                                                        >
                                                                            <i className="fa-solid fa-trash-can text-white"></i>
                                                                        </Link>
                                                                    </button>
                                                                    {
                                                                        create == 'true' ?
                                                                            <button type="button" className="btn btn-primary">
                                                                                <Link to={`/dashboard/order/edit/${e.idOrder}`}>
                                                                                    <i className="fa-solid fa-pen-to-square text-white"></i>
                                                                                </Link>
                                                                            </button>
                                                                            : ''
                                                                    }

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    : ''
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
}