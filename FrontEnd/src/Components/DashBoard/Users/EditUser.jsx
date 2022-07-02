import { useState, useEffect } from 'react';
import EditForm from '../Other/EditForm';
import { useParams } from 'react-router-dom';
import { axiosJWT } from '../../../AxiosJWT';
import { getUserById, updateUser } from '../../api/ApiUser';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../Action/Action';

export default function EditUser({ handleRedirect }) {
    const keyJwt = localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = handleRedirect.userCurrentByToken;

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const param = useParams();
    const [dataCurrent, setDataCurrent] = useState([]);
    const [dataChangeNew, setDataChangeNew] = useState({});
    const [handleSubmit, setHandleSubmit] = useState(false);
    let dataHandle = { setDataChangeNew, setHandleSubmit };
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchUserByid = async () => {
            try {
                let data = await getUserById(keyJwt, axiosJwt, param.id);
                setDataCurrent(data);
            } catch (error) {
                console.log('err by id');
            }
        }
        fetchUserByid();
    }, [])

    useEffect(() => {
        if (handleSubmit) {
            const fetchUpdateUser = async () => {
                try {
                    console.log('update user');
                    let data = await updateUser(dataChangeNew);
                    setHandleSubmit(false);
                    console.log('sau fetch update', data);
                } catch (error) {
                    console.log('update user err');
                    setHandleSubmit(false);
                }
            }
            fetchUpdateUser();
        }
    }, [handleSubmit])

    // console.log(dataChangeNew, 'dataChangeNew');


    return (
        <div className="container_user_dashboard edit_user">
            <EditForm stateForm={dataCurrent[0]} titleForm='Edit User' thisPage='User' dataHandle={dataHandle} />
        </div>
    );
}