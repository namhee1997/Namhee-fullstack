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
    const [err, setErr] = useState(false);
    useEffect(() => {

        if (tokenUserCurrent == '') {
            navigate('/login');
        } else if (tokenUserCurrent != '' && tokenUserCurrent != 'undefined') {
            setUserCurrentByToken(jwtDecode(tokenUserCurrent));
        }

    }, [])
    useEffect(() => {
        if (userCurrentByToken?.role !== undefined) {
            let date = new Date();
            if (userCurrentByToken.exp < date.getTime() / 1000) {
                navigate('/login');
            } else {
                navigate('/');
            }
        }
    }, [userCurrentByToken])
    // check logger

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await loginUser(dataLogin, dispatch, navigate).then((e) => {
            if (e == '' && e == undefined && e == 'undefined') {
                localStorage.setItem('token', '');
            } else {
                let obj = jwtDecode(e);
                if (obj.isDashBoard == false) {
                    let date = new Date();
                    if (obj.exp < date.getTime() / 1000) {
                        navigate('/login');
                    } else {
                        console.log(e, 'token');
                        localStorage.setItem('token', String(e));
                        window.location.reload(1);
                        // navigate('/');
                    }
                }
            }
        }).catch((err) => {
            setErr(true);
        });

    }

    console.log('rerender');
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
            {
                err ? <div className="err_login">
                    <p>Incorrect account information or password</p>
                </div>
                    : ''
            }
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
    );
}

export default Login;