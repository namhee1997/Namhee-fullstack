import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector } from 'react-redux';
import { addNewUser } from '../../api/ApiUser';
import { iconLoading } from '../../svg/svg';

export default function AddUsers({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
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
    const [isLoading, setIsLoading] = useState(false);
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
                    let data = await addNewUser(dataForm);
                    setEventSubmit(false);
                    setIsLoading(false);
                } catch (error) {
                    setEventSubmit(false);
                    setIsLoading(false);
                    console.log('Failed to fetch product list: ', error);
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
            <CreateForm titleForm='Add User' thisPage="User" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}