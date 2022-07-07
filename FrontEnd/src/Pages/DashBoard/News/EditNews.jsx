import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from './EditFormNews';
import { useStore } from 'react-redux';
import { getNewsById, updateNews } from '../../api/ApiNews';
import { axiosJWT } from "../../../AxiosJWT";
import { loginSuccess } from "../../../Action/Action";
import { useDispatch } from "react-redux";
import jwtDecode from 'jwt-decode';
import { iconLoading } from '../../svg/svg';

export default function EditNews({ handleRedirect }) {

    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);
    const [isLoading, setIsLoading] = useState(true);

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
    const [eventSubmit, setEventSubmit] = useState(false);
    let dataHandle = { setDataChangeNew, setEventSubmit };
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);

        const fechGetByIdNews = async () => {
            try {
                let data = await getNewsById(keyJwt, axiosJwt, param.slug);
                console.log('get by id success news', data);
                setDataCurrent(data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log('get by id news err 1');
                setIsLoading(false);
            }
        }
        fechGetByIdNews();
    }, [])

    useEffect(() => {
        if (Object.keys(dataChangeNew).length > 0 && eventSubmit) {
            setIsLoading(true);

            const fetchEditNews = async () => {
                try {
                    let data = await updateNews(dataChangeNew);
                    console.log('update news success ', data);
                    setIsLoading(false);
                } catch (error) {
                    console.log('update news err 1');
                    setIsLoading(false);
                }
            };
            fetchEditNews();

            setEventSubmit(false);
        }
    }, [dataChangeNew, eventSubmit])
    // console.log(dataChangeNew, 'dataChangeNew');

    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <EditForm stateForm={dataCurrent} titleForm='Edit News' thisPage='News' dataHandle={dataHandle} />
        </div>
    );
}