import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useDispatch } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { loginSuccess } from '../../Action/Action';
import { axiosJWT } from "../../AxiosJWT";
import { getAllUser } from "../api/ApiUser";
import { getAllOrderUser } from "../api/ApiOrderUser";
import { getAllOrderSuccess } from "../api/ApiOrderSuccess";


export default function DashBoard({ handleRedirect }) {
    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = handleRedirect.userCurrentByToken;

    const [totalUser, setTotalUser] = useState([]);
    const [totalOrderUser, setTotalOrderUser] = useState([]);
    const [totalOrderSuccess, setTotalOrderSuccess] = useState([]);

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
        const fetchGetAllUser = async () => {
            try {
                let data = await getAllUser(keyJwt, axiosJwt);
                console.log('get all user success', data);
                setTotalUser(data);
            } catch (error) {
                console.log('get all user err 1');
            }
        }
        const fetchGetAllOrderUser = async () => {
            try {
                let data = await getAllOrderUser(keyJwt, axiosJwt);
                console.log('get all order user success', data);
                setTotalOrderUser(data);
            } catch (error) {
                console.log('get all user err 1');
            }
        }
        const fetchGetAllOrderSuccess = async () => {
            try {
                let data = await getAllOrderSuccess(keyJwt, axiosJwt);
                console.log('get all order success', data);
                setTotalOrderSuccess(data);
            } catch (error) {
                console.log('get all user err 1');
            }
        }

        fetchGetAllOrderSuccess();
        fetchGetAllOrderUser();
        fetchGetAllUser();

    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.floor(Math.random() * (1000 - 0 + 1) + 0)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.floor(Math.random() * (1000 - 0 + 1) + 0)),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    return (
        <div className="dashboard">
            <div className="container_dashboard">
                <div className="content_dashboard">
                    <h2>DashBoard</h2>
                    <ul className="list_dashboard box_shadow">
                        <li className="total_user">
                            <Link to={`/dashboard/user`}>
                                <h4>Tổng số người đăng ký: {totalUser.length}</h4>
                            </Link>
                        </li>
                        <li className="total_price">
                            <Link to={`/dashboard/order`}>
                                <h4>Tổng số đơn hàng đã giao dịch: {totalOrderSuccess.length}</h4>
                            </Link>
                        </li>
                        <li className="total_order">
                            <Link to={`/dashboard/order`}>
                                <h4>Tổng số đơn hàng đang đặt: {totalOrderUser.length}</h4>
                            </Link>
                        </li>
                    </ul>

                    <div className="box_chart box_shadow">
                        <div className="transaction_total">
                            <h2>Tổng số giao dịch người dùng</h2>
                            <div className="select_time">
                                <select name="" id="" onChange={() => { }}>
                                    <option value="day">Theo ngày</option>
                                    <option value="month">Theo tháng</option>
                                    <option value="year">Theo năm</option>
                                </select>
                            </div>
                            <Bar options={options} data={data} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}