import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import Table from "../Other/Table";
import { axiosJWT } from "../../../AxiosJWT";
import { loginSuccess } from "../../../Action/Action";
import { useDispatch } from "react-redux";
import { getAllNews } from "../../api/ApiNews";

export default function News({ handleRedirect }) {

    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = handleRedirect.userCurrentByToken;

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore();
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'content', 'url to', 'avatar']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetAllNews = async () => {
            try {
                let data = await getAllNews(keyJwt, axiosJwt);
                console.log('get all news success', data);
                setDataCurrent(data);
            } catch (error) {
                console.log('get all news err 1');
            }
        }
        fetchGetAllNews();
        // setDataCurrent(store.getState().newsList.list);
    }, [reRender])
    let handleReRender = { setReRender };
    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='News' title='News'
                linkCreate="/dashboard/news/create"
                handleReRender={handleReRender}
            />
        </div>
    );
}