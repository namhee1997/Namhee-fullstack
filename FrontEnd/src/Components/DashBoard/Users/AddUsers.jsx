import { useState } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function AddUsers() {

    const [stateForm, setStateForm] = useState([
        { name: 'username', type: 'text', placeholder: 'Enter your username' },
        { name: 'password', type: 'password', placeholder: 'Enter your password' },
        { name: 'role', type: 'select', list: [{ title: 'admin', slug: 'admin' }, { title: 'user', slug: 'user' }] },
        { name: 'fullname', type: 'text', placeholder: 'Enter your fullname' },
        { name: 'address', type: 'text', placeholder: 'Enter your address' },
        { name: 'email', type: 'text', placeholder: 'Enter your email' },
        { name: 'phone', type: 'text', placeholder: 'Enter your phone' },
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
            <CreateForm titleForm='Add User' thisPage="User" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}