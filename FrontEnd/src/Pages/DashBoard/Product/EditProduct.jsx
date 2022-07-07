import EditForm from './EditFormProduct/EditFormProduct';
import { useEffect } from 'react';
import { useState } from 'react';

export default function EditProduct({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    return (
        <div className="container_user_dashboard">
            <EditForm />
        </div>
    );
}