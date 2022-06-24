import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutApi } from "../api/ApiLoginUser";
import "./navbar.css";
import avatar from '../../assets/img/chelseadfhzdfzhzdrha_vomy.jpg'

const NavBar = ({ userCurrent, refresh }) => {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isChangeCart = useSelector(e => e.cart.checkChange)
  const [user, setUSer] = useState(null);
  const [showItem, setShowItem] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  useEffect(() => {
    if (userCurrent.role !== undefined) {
      setUSer(true);
    }
  }, [userCurrent])
  useEffect(() => {
    setTotalCart((store.getState().cart.data).length);
  }, [isChangeCart])

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutApi(dispatch, 1, navigate);
    refresh.setCheckLogOut(true);
  }


  return (
    <nav className="navbar-container">
      <div className="logo">
        <Link to="/"> Nam Hee </Link>
      </div>
      <div className="list_menu">
        <ul>
          <li>
            <Link to="/phone/apple"> APPLE </Link>
          </li>
          <li>
            <Link to="/phone/samsung"> SAMSUNG </Link>
          </li>
          <li>
            <Link to="/phone/vivo"> VIVO </Link>
          </li>
          <li>
            <Link to="/phone/nokia"> NOKIA </Link>
          </li>
        </ul>
      </div>
      <div className="user">
        {user ? (
          <>
            <p className="name_login">
              {
                refresh.checkLogOut ?
                  ``
                  : <img src={`${avatar}`} alt="" />
              }

              <span>
                {
                  refresh.checkLogOut ?
                    ``
                    : `Hi! ${userCurrent.username || ''}`
                }

              </span>
            </p>
          </>
        ) : ''
        }
        <div className="cart">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="count_cart">{totalCart}</span>
          </Link>
        </div>

        <div className="user_">
          <i className="fa-solid fa-user"></i>
          <ul className={`list_select_user ${showItem ? `show` : ``}`}>
            {user ? (
              <>
                <li >
                  <Link to="/logout" className="navbar-logout" onClick={(e) => handleLogOut(e)}> Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="navbar-login"> Login </Link>
                </li>
                <li>
                  <Link to="/register" className="navbar-register"> Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

    </nav >
  );
};

export default NavBar;

