import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/ApiLoginUser";
import { useDispatch } from "react-redux";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "./login.css";
const LoginDashBoard = () => {
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
            navigate('/dashboard/login');
        } else if (tokenUserCurrent != '') {
            setUserCurrentByToken(jwtDecode(tokenUserCurrent));
        }

    }, [])
    useEffect(() => {
        if (userCurrentByToken?.role !== undefined) {
            navigate('/dashboard');
        }
    }, [userCurrentByToken])
    // check logger

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await loginUser(dataLogin, dispatch, navigate, true);
        if (data == '') {
            console.log('err login');
            return;
        }
        let obj = jwtDecode(data);
        if (obj.isDashBoard == true) {
            localStorage.setItem('token', data);
            navigate('/dashboard');
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
        </section>
    );
}

export default LoginDashBoard;