import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from './EditFormCompany';
import { useStore } from 'react-redux';

export default function EditCompany() {
    const param = useParams();
    const store = useStore();
    const [dataCurrent, setDataCurrent] = useState({});
    const [dataChangeNew, setDataChangeNew] = useState({});
    const [checkSubmit, setCheckSubmit] = useState(false);
    let dataHandle = { setDataChangeNew, setCheckSubmit };

    useEffect(() => {
        setDataCurrent(store.getState().companyPhone.list[0]);
    }, [])
    useEffect(() => {
        if (checkSubmit) {
            setDataCurrent(e => {
                let data = { ...e };
                if (dataChangeNew.title) {
                    data.title = dataChangeNew.title;
                }
                if (dataChangeNew.slug) {
                    data.slug = dataChangeNew.slug;
                }
                if (dataChangeNew.src) {
                    data.src = dataChangeNew.src;
                }

                return data;
            });
            setCheckSubmit(false);
        }
    }, [checkSubmit])

    console.log(dataCurrent, 'dataCurrent');
    return (
        <div className="container_user_dashboard">
            <EditForm stateForm={dataCurrent} titleForm='Edit Company' dataHandle={dataHandle} />
        </div>
    );
}