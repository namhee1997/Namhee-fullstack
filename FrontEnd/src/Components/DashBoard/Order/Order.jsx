import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";
import ViewBox from "./ViewBox/ViewBox";

export default function Order() {
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['Id Order', 'Slug Product', 'Title Product', 'Price', 'Sale', 'Cost', 'User Buy', 'Paid']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [dataUserCurrent, setDataUserCurrent] = useState(
        {
            username: 'ct', role: 'user',
            fullname: 'nguyen van a',
            avatar: 'https://res.cloudinary.com/dungdv/image/upload/v1652753864/ccohkl7gwrnajs8qgtfi.png',
            address: 'vinh nghe an', email: 'nunal0889@gmail.com',
            phone: '0968796293', userId: 1
        }
    );
    const [viewBox, setViewBox] = useState({
        view: false,
        userID: 0,
        idOrder: 0
    });
    useEffect(() => {
        setDataCurrent(store.getState().orderList.list);
    }, [])
    let dataHandle = {
        setViewBox
    };
    console.log(viewBox, 'viewBox');
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Order' title='Order'
                linkCreate="/dashboard/order/create" dataHandle={dataHandle}
            />
            <ViewBox viewBox={viewBox} dataHandle={dataHandle} dataUserCurrent={dataUserCurrent} />
        </div>
    );
}