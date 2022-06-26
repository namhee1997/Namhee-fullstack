import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";

export default function News({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'content', 'url to', 'avatar']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().newsList.list);
    }, [])
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='News' title='News'
                linkCreate="/dashboard/news/create"
            />
        </div>
    );
}