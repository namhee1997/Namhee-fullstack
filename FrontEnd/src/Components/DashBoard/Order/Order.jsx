import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";

export default function Order() {
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['Id Order', 'Slug Product', 'Title Product', 'Price', 'Sale', 'Cost', 'User Buy', 'Paid']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().orderList.list);
    }, [])
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Order' title='Order' />
        </div>
    );
}