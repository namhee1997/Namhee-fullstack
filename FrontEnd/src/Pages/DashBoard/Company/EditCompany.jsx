import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from './EditFormCompany';
import { useStore } from 'react-redux';
import { getCompanyById, updateCompany } from '../../api/ApiCompany';
import { loginSuccess } from '../../../Action/Action';
import { axiosJWT } from '../../../AxiosJWT';
import jwtDecode from 'jwt-decode';
import { iconLoading } from '../../svg/svg';
import { useDispatch } from 'react-redux';

export default function EditCompany({ handleRedirect }) {
    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const param = useParams();
    const store = useStore();
    const [dataCurrent, setDataCurrent] = useState({});
    const [dataChangeNew, setDataChangeNew] = useState({});
    const [checkSubmit, setCheckSubmit] = useState(false);
    let dataHandle = { setDataChangeNew, setCheckSubmit };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetById = async () => {
            try {
                let data = await getCompanyById(keyJwt, axiosJwt, param.slug);
                console.log('get by id company success', data);
                setDataCurrent(data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log('get by id company err1');
                setIsLoading(false);
            }
        };
        fetchGetById();
        // setDataCurrent(store.getState().companyPhone.list[0]);
    }, [])
    useEffect(() => {
        if (checkSubmit) {

            const fetchUpdataCompany = async () => {
                try {
                    let data = await updateCompany(dataChangeNew);
                    console.log('update company success', data);

                } catch (error) {
                    console.log('updata company err 1');
                }
            };
            fetchUpdataCompany();

            setCheckSubmit(false);
        }
    }, [checkSubmit])

    console.log(dataChangeNew, 'dataChangeNew');

    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <EditForm stateForm={dataCurrent} titleForm='Edit Company' dataHandle={dataHandle} />
        </div>
    );
}