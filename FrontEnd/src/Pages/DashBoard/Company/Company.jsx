import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";
import { useDispatch } from "react-redux";
import { getAllCompany } from "../../api/ApiCompany";
import { axiosJWT } from "../../../AxiosJWT";
import { loginSuccess } from "../../../Action/Action";
import { iconLoading } from "../../svg/svg";

export default function Company({ handleRedirect }) {

    const keyJwt = localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = handleRedirect.userCurrentByToken;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'avatar']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        setIsLoading(true);

        const fetchGetAllCompany = async () => {
            try {
                let data = await getAllCompany(keyJwt, axiosJwt);
                console.log('get all data success', data);
                setDataCurrent(data);
                setIsLoading(false);
            } catch (error) {
                console.log('get all company err 1');
                setIsLoading(false);
            }
        };
        fetchGetAllCompany();
        // setDataCurrent(store.getState().companyPhone.list);
    }, [reRender])
    let handleReRender = { setReRender };
    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Company' title='Company'
                linkCreate="/dashboard/company/create"
                handleReRender={handleReRender}
            />
        </div>
    );
}