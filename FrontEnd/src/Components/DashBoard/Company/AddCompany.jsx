import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';
import { addNewCompany } from '../../api/ApiCompany';
import { iconLoading } from '../../svg/svg';

export default function AddCompany({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const [isLoading, setIsLoading] = useState(false);
    const [stateForm, setStateForm] = useState([
        { name: 'title', type: 'text', placeholder: 'Enter your title' },
        { name: 'slug', type: 'text', placeholder: 'Enter your slug' },
        { name: 'Avatar', type: 'file' },
    ]);


    const [dataForm, setDataForm] = useState({});
    const [dataAvatar, setDataAvatar] = useState('');
    const [eventSubmit, setEventSubmit] = useState(false);

    let dataHandle = {
        setDataForm,
        setDataAvatar,
        setEventSubmit,
    }

    useEffect(() => {

        if (Object.keys(dataForm).length > 0 && eventSubmit) {
            setIsLoading(true);
            const fetchUserList = async () => {
                try {
                    let data = await addNewCompany(dataForm);
                    console.log('add new success', data);
                    setEventSubmit(false);
                    setIsLoading(false);
                } catch (error) {
                    setEventSubmit(false);
                    console.log('Failed to fetch company list: ', error);
                }
            }

            fetchUserList();
        }

    }, [dataForm])

    console.log(dataForm, 'dataForm', dataAvatar);

    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <CreateForm titleForm='Add Company' thisPage="Company" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}