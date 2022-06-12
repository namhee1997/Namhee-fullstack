import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


export default function DashBoard() {
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
                            <Link to={`/`}>
                                <h4>Tổng số người dùng: 100</h4>
                            </Link>
                        </li>
                        <li className="total_price">
                            <Link to={`/`}>
                                <h4>Tổng số tiền đã giao dịch: 100.000.000VNĐ</h4>
                            </Link>
                        </li>
                    </ul>

                    <div className="box_chart box_shadow">
                        <div className="transaction_total">
                            <h2>Tổng số giao dịch người dùng</h2>
                            <div className="select_time">
                                <select name="" id="">
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