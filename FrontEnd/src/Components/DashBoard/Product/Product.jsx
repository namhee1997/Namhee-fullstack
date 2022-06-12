import { useEffect, useState } from "react";
import Table from "../Other/Table";
import { useStore } from "react-redux";

export default function Product() {
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'sale', 'price', 'avatar', 'cost', 'promotion', 'company', 'variable']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().infoPhone.dataPhones);
    }, [])

    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Product' title='Product' />
        </div>
    );
}