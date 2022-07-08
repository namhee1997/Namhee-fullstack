import { Link } from "react-router-dom";

export default function HeaderDashBoard({ userCurrent }) {
    let location = window.location.pathname.split('/');

    return (
        <header>
            <div className="container_header">
                <Link to={`/dashboard`}>
                    <h1>DashBoard</h1>
                </Link>
                <ul>
                    <li>
                        <Link to={`/dashboard`}>
                            <i className="fa-solid fa-gauge"></i>
                            DashBoard
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/user`}>
                            <i className="fa-solid fa-user-group"></i>
                            User
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/product`}>
                            <i className="fa-brands fa-product-hunt"></i>
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/company`}>
                            <i className="fa-solid fa-building"></i>
                            Company
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/slides`}>
                            <i className="fa-solid fa-sliders"></i>
                            Slides
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/news`}>
                            <i className="fa-solid fa-newspaper"></i>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/order`}>
                            <i className="fa-solid fa-truck-fast"></i>
                            Oder
                        </Link>
                    </li>
                </ul>
                <div className="user_login">
                    <h2>Wellcome: {userCurrent?.username || ''}</h2>
                    <Link to={`/`}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Link>
                </div>
            </div>
        </header >
    );
}