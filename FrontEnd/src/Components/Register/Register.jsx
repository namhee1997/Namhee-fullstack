import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUserApi } from "../api/ApiLoginUser";
import { useDispatch } from "react-redux";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataLogin, setDataLogin] = useState({
        email: '',
        username: '',
        password: '',
    });

    // check logger
    const tokenUserCurrent = (localStorage.getItem('token') || '');
    const [userCurrentByToken, setUserCurrentByToken] = useState({});
    useEffect(() => {

        if (tokenUserCurrent == '') {
            navigate('/register');
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
        let data = await registerUserApi(dataLogin, dispatch, navigate);
        if (data == 'success') {
            navigate('/login');
        }

    }
    return (
        <section className="register-container">
            <div className="register-title"> Register </div>
            <form>
                <div className="box_login n1">
                    <label>EMAIL</label>
                    <input type="text" placeholder="Enter your email"
                        onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
                    />
                </div>
                <div className="box_login n1">
                    <label>USERNAME</label>
                    <input type="text" placeholder="Enter your username"
                        onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })}
                    />
                </div>
                <div className="box_login">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Enter your password"
                        onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
                    />
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)}> Create account </button>
            </form>
        </section>

    );
}

export default Register;