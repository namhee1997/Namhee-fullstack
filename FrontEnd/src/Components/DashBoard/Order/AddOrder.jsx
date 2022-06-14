import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';

export default function AddOrder() {
    const data = useSelector(e => e.companyPhone.list)

    const [stateForm, setStateForm] = useState([
        { name: 'title', type: 'text', placeholder: 'Enter your title' },
        { name: 'slug', type: 'text', placeholder: 'Enter your slug' },
        { name: 'sale', type: 'text', placeholder: 'Enter your sale' },
        { name: 'price', type: 'text', placeholder: 'Enter your price' },
        { name: 'Avatar', type: 'file' },
        { name: 'const', type: 'text', placeholder: 'Enter your const' },
        { name: 'promotion', type: 'select', list: [{ title: 'true', slug: 'true' }, { title: 'false', val: 'false' }] },
        { name: 'company', type: 'select', list: data },
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
            <CreateForm titleForm='Add Order' thisPage="Order" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}