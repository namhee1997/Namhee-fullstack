import { useEffect, useState } from "react";
import Table from "../Other/Table";
import { useStore } from "react-redux";

export default function Product({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'sale', 'price', 'avatar', 'cost', 'promotion', 'company', 'variable', 'infophone']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().infoPhone.dataPhones);
    }, [])

    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Product'
                title='Product'
                linkCreate="/dashboard/product/create"
            />
        </div>
    );
}