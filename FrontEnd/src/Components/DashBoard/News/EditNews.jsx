import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from './EditFormNews';
import { useStore } from 'react-redux';

export default function EditNews() {
    const param = useParams();
    const store = useStore();
    const [dataCurrent, setDataCurrent] = useState({});
    const [dataChangeNew, setDataChangeNew] = useState({});
    let dataHandle = { setDataChangeNew };
    useEffect(() => {
        setDataCurrent(store.getState().newsList.list[0]);
    }, [])
    console.log(dataChangeNew, 'dataChangeNew');

    return (
        <div className="container_user_dashboard">
            <EditForm stateForm={dataCurrent} titleForm='Edit News' thisPage='News' dataHandle={dataHandle} />
        </div>
    );
}