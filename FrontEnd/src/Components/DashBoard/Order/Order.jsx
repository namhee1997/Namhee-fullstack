import { useStore, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";
import ViewBox from "./ViewBox/ViewBox";
import { removeOrder, removeOrderCustom, loginSuccess } from "../../../Action/Action";

import { axiosJWT } from "../../../AxiosJWT";
import { getAllOrderSuccess } from "../../api/ApiOrderSuccess";
import { getAllOrderUser } from "../../api/ApiOrderUser";
import { getUserById } from "../../api/ApiUser";

export default function Order({ handleRedirect }) {

    const keyJwt = localStorage.getItem('token');
    const user = handleRedirect.userCurrentByToken;

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore();
    const dispatch = useDispatch();
    const [titleCurrent, setTitleCurrent] = useState(['Slug Product', 'Title Product', 'Price', 'Sale', 'Cost', 'User Buy', 'Paid']);
    const [titleCustoms, setTitleCustoms] = useState(['title', 'fullname', 'price', 'address', 'promotion', 'company', 'phone']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [dataCustoms, setDataCustoms] = useState([]);
    const [dataUserCurrent, setDataUserCurrent] = useState({});
    const [viewBox, setViewBox] = useState({
        view: false,
        userID: 0,
        idOrder: 0
    });
    const [stateRF, setstateRF] = useState(true)

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetAllOrderSuccess = async () => {
            try {
                let data = await getAllOrderSuccess(keyJwt, axiosJwt);
                console.log('get all order success ', data);
                setDataCustoms(data);
            } catch (error) {
                console.log('get all order success err 1');
            }
        }
        const fetchGetAllOrderUser = async () => {
            try {
                let data = await getAllOrderUser(keyJwt, axiosJwt);
                console.log('get all order user success ', data);
                setDataCurrent(data);
            } catch (error) {
                console.log('get all order success err 1');
            }
        }
        fetchGetAllOrderSuccess();
        fetchGetAllOrderUser();
        // setDataCurrent(store.getState().orderList.list);
        // setDataCustoms(store.getState().orderList.dataAdd);
    }, [stateRF])

    const handleRemoveTable = (id) => {
        let data = removeOrder(id);
        dispatch(data);
        setstateRF(!stateRF);
    }

    const handleRemoveTableCustom = (id) => {
        let data = removeOrderCustom(id);
        dispatch(data);
        setstateRF(!stateRF);
    }

    let dataHandle = {
        setViewBox,
        handleRemoveTable,
        handleRemoveTableCustom
    };

    useEffect(() => {
        if (viewBox.view) {
            let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
            const fetchUserByid = async () => {
                try {
                    let data = await getUserById(keyJwt, axiosJwt, viewBox.userID);
                    console.log('get user by id success', data);
                    setDataUserCurrent(data[0]);
                } catch (error) {
                    console.log('err by id');
                }
            }
            fetchUserByid();

            console.log(viewBox, 'viewBox');
        }
    }, [viewBox])

    // console.log(dataCurrent, dataCustoms, 'dataaa');


    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Order' create='false' title='Order'
                linkCreate="/dashboard/order/create" dataHandle={dataHandle}
            />
            <Table dataTitle={titleCustoms} dataCurrent={dataCustoms} thisPage='Order-Custom' title='Orders Placed'
                linkCreate="/dashboard/order/create" dataHandle={dataHandle}
            />
            <ViewBox viewBox={viewBox} dataHandle={dataHandle} dataUserCurrent={dataUserCurrent} />
        </div>
    );
}