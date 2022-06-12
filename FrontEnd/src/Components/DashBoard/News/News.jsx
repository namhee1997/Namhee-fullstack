import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";

export default function News() {
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'content', 'url to']);
    const [dataCurrent, setDataCurrent] = useState([]);
    useEffect(() => {
        setDataCurrent(store.getState().newsList.list);
    }, [])
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='News' title='News' />
        </div>
    );
}