import { useState, useEffect } from 'react';
import EditForm from '../Other/EditForm';
import { useParams } from 'react-router-dom';

export default function EditUser({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const param = useParams();
    const [dataCurrent, setDataCurrent] = useState({});
    const [dataChangeNew, setDataChangeNew] = useState({});
    let dataHandle = { setDataChangeNew };
    useEffect(() => {
        setDataCurrent({
            username: 'vivannam', role: 'user',
            fullname: 'vi van nam',
            password: '123456',
            avatar: 'https://res.cloudinary.com/dungdv/image/upload/v1652753864/ccohkl7gwrnajs8qgtfi.png',
            address: 'vinh nghe an', email: 'nunal0889@gmail.com',
            phone: '0968796293', userId: 1
        });
    }, [])
    console.log(dataChangeNew, 'dataChangeNew');


    return (
        <div className="container_user_dashboard edit_user">
            <EditForm stateForm={dataCurrent} titleForm='Edit User' thisPage='User' dataHandle={dataHandle} />
        </div>
    );
}