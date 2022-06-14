import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';

export default function AddCompany() {

    const [stateForm, setStateForm] = useState([
        { name: 'title', type: 'text', placeholder: 'Enter your title' },
        { name: 'slug', type: 'text', placeholder: 'Enter your slug' },
        { name: 'Avatar', type: 'file' },
    ]);


    const [dataForm, setDataForm] = useState({});
    const [dataAvatar, setDataAvatar] = useState('');

    let dataHandle = {
        setDataForm,
        setDataAvatar,
    }
    console.log(dataForm, 'dataForm', dataAvatar);

    return (
        <div className="container_user_dashboard">
            <CreateForm titleForm='Add Company' thisPage="Company" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}