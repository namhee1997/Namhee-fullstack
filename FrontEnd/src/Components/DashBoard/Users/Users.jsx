import { useState, useEffect } from "react";
import Table from "../Other/Table";
import { getAllUser } from "../../api/ApiUser";
import { loginSuccess, setAllUser } from "../../../Action/Action";
import { useDispatch, useSelector, useStore } from "react-redux";
import { axiosJWT } from "../../../AxiosJWT";
import { iconLoading } from "../../svg/svg";

export default function Users({ handleRedirect }) {
    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = handleRedirect.userCurrentByToken;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const [titleCurrent, setTilteCurrent] = useState(['username', 'role', 'fullname', 'avatar', 'address', 'email', 'phone']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {

        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchAllUser = async () => {
            try {
                let data = await getAllUser(keyJwt, axiosJwt);
                setDataCurrent(data);
                setIsLoading(false);
            } catch (e) {
                console.log(e, 'err get all un user.jsx');
                setIsLoading(false);
            }
        }
        fetchAllUser();

    }, [reRender])
    let handleReRender = { setReRender };
    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='User'
                title='User' linkCreate="/dashboard/user/create" handleReRender={handleReRender}
            />
        </div>
    );
}