import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";

export default function Company() {
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'avatar']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().companyPhone.list);
    }, [])
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Company' title='Company' />
        </div>
    );
}