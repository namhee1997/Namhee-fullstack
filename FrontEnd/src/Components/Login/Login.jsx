import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/ApiLoginUser";
import { useDispatch } from "react-redux";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: '',
    });

    // check logger
    const tokenUserCurrent = (localStorage.getItem('token') || '');
    const [userCurrentByToken, setUserCurrentByToken] = useState({});
    useEffect(() => {

        if (tokenUserCurrent == '') {
            navigate('/login');
        } else if (tokenUserCurrent != '') {
            setUserCurrentByToken(jwtDecode(tokenUserCurrent));
        }

    }, [])
    useEffect(() => {
        if (userCurrentByToken?.role !== undefined) {
            navigate('/');
        }
    }, [userCurrentByToken])
    // check logger

    const handleSubmit = async (e) => {
        e.preventDefault();
        // navigate('/');
        let data = await loginUser(dataLogin, dispatch, navigate);
        if (data == '') {
            console.log('err login');
            return;
        }
        let obj = jwtDecode(data);
        if (obj.isDashBoard == false) {
            localStorage.setItem('token', data);
            navigate('/');
        }

    }
    return (
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form>
                <div className="box_login n1">
                    <label>USERNAME</label>
                    <input type="text" placeholder="Enter your username"
                        onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })} />
                </div>
                <div className="box_login">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Enter your password"
                        onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)}> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
    );
}

export default Login;