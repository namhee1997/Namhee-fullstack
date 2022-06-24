import { useState, useEffect } from "react";
import Table from "../Other/Table";

export default function Users({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const [titleCurrent, setTilteCurrent] = useState(['username', 'role', 'fullname', 'avatar', 'address', 'email', 'phone']);
    const [dataCurrent, setDataCurrent] = useState([
        {
            username: 'vivannam', role: 'user',
            fullname: 'vi van nam',
            avatar: 'https://res.cloudinary.com/dungdv/image/upload/v1652753864/ccohkl7gwrnajs8qgtfi.png',
            address: 'vinh nghe an', email: 'nunal0889@gmail.com',
            phone: '0968796293', userId: 1
        }
    ]);
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='User'
                title='User' linkCreate="/dashboard/user/create"
            />
        </div>
    );
}