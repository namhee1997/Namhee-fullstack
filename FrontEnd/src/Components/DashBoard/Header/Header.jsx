import { Link } from "react-router-dom";

export default function HeaderDashBoard({ userCurrent }) {
    let location = window.location.pathname.split('/');
    console.log(userCurrent);

    return (
        <header>
            <div className="container_header">
                <Link to={`/dashboard`}>
                    <h1>DashBoard</h1>
                </Link>
                <ul>
                    <li>
                        <Link to={`/dashboard`}>
                            DashBoard
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/user`}>
                            User
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/product`}>
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/company`}>
                            Company
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/slides`}>
                            Slides
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/news`}>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/order`}>
                            Oder
                        </Link>
                    </li>
                </ul>
                <div className="user_login">
                    <h2>Wellcome: {userCurrent?.username || ''}</h2>
                </div>
            </div>
        </header>
    );
}