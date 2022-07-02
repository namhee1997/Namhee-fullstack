import { useEffect, useState } from "react";
import Table from "../Other/Table";
import { getAllProduct } from "../../api/ApiProduct";
import { useDispatch, useSelector, useStore } from "react-redux";
import { loginSuccess } from "../../../Action/Action";
import { axiosJWT } from "../../../AxiosJWT";

export default function Product({ handleRedirect }) {
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
    const [titleCurrent, setTilteCurrent] = useState(['title', 'slug', 'sale', 'price', 'avatar', 'cost', 'promotion', 'company', 'variable', 'infophone']);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetAllProduct = async () => {
            try {
                let data = await getAllProduct(keyJwt, axiosJwt);
                console.log('get all product success 1', data);
                setDataCurrent(data);
            } catch (error) {
                console.log('get all product err 1');
            }
        }
        fetchGetAllProduct();
    }, [reRender])
    let handleReRender = { setReRender };
    // console.log(dataCurrent, 'dataCurrent');


    return (
        <div className="container_user_dashboard">
            <Table dataTitle={titleCurrent} dataCurrent={dataCurrent} thisPage='Product'
                title='Product'
                linkCreate="/dashboard/product/create"
                handleReRender={handleReRender}
            />
        </div>
    );
}