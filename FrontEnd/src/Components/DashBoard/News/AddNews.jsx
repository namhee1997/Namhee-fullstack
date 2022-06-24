import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';

export default function AddNews({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const [stateForm, setStateForm] = useState([
        { name: 'title', type: 'text', placeholder: 'Enter your title' },
        { name: 'slug', type: 'text', placeholder: 'Enter your slug' },
        { name: 'content', type: 'text', placeholder: 'Enter your content' },
        { name: 'urlto', type: 'text', placeholder: 'Enter your urlto' },
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
            <CreateForm titleForm='Add News' thisPage="News" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}