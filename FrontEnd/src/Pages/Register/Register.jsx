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
        address: '',
        phone: '',
    });

    const [requireUsername, setRequireUsername] = useState(false);
    const [requirePhone, setRequirePhone] = useState(false);

    // check logger
    const tokenUserCurrent = (localStorage.getItem('token') || '');
    const [userCurrentByToken, setUserCurrentByToken] = useState({});
    useEffect(() => {

        if (tokenUserCurrent == '') {
            navigate('/register');
        } else if (tokenUserCurrent != '' && tokenUserCurrent && tokenUserCurrent != undefined && tokenUserCurrent != 'undefined') {
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
        if (!(/^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g.test(dataLogin.username))) {
            setRequireUsername(true);
            return;
        }
        if (!(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(dataLogin.phone))) {
            setRequirePhone(true);
            return;
        }
        let data = await registerUserApi(dataLogin, dispatch, navigate).then((e) => {
            if (e == 'success') {
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err, 'err register');
        });

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
                        onChange={(e) => { setDataLogin({ ...dataLogin, username: e.target.value }); setRequireUsername(false); }}
                    />
                    {
                        requireUsername ? <p className="err">malformed data(data must be unsigned, no spaces)</p> : ''
                    }
                </div>
                <div className="box_login">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Enter your password"
                        onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
                    />
                </div>
                <div className="box_login">
                    <label>ADDRESS</label>
                    <input type="address" placeholder="Enter your address"
                        onChange={(e) => setDataLogin({ ...dataLogin, address: e.target.value })}
                    />
                </div>
                <div className="box_login">
                    <label>PHONE</label>
                    <input type="phone" placeholder="Enter your phone"
                        onChange={(e) => { setDataLogin({ ...dataLogin, phone: e.target.value }); setRequirePhone(false); }}
                    />
                    {
                        requirePhone ? <p className="err">Invalid phone number</p> : ''
                    }
                </div>

                <button type="submit" onClick={(e) => handleSubmit(e)}> Create account </button>
            </form>
        </section>

    );
}

export default Register;