import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../../Action/Action';
import { addNewOrderSuccess } from '../../api/ApiOrderSuccess';
import { iconLoading } from '../../svg/svg';

export default function AddOrder({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const data = useSelector(e => e.companyPhone.list)
    const dataPromotion = useSelector(e => e.promotionList.data)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [stateForm, setStateForm] = useState([
        { name: 'title', type: 'text', placeholder: 'Enter your title' },
        { name: 'name', type: 'text', placeholder: 'Enter your name' },
        { name: 'fullname', type: 'text', placeholder: 'Enter your fullname' },
        { name: 'price', type: 'text', placeholder: 'Enter your price' },
        { name: 'phone', type: 'text', placeholder: 'Enter your phone' },
        { name: 'address', type: 'text', placeholder: 'Enter your address' },
        { name: 'promotion', type: 'select', list: dataPromotion },
        { name: 'company', type: 'select', list: data },
    ]);


    const [dataForm, setDataForm] = useState({});
    const [dataAvatar, setDataAvatar] = useState('');
    const [checkFirsRerender, setCheckFirsRerender] = useState(false);

    const [eventSubmit, setEventSubmit] = useState(false);

    let dataHandle = {
        setDataForm,
        setDataAvatar,
        setEventSubmit,
    }


    useEffect(() => {

        if (Object.keys(dataForm).length > 0 && eventSubmit) {
            setIsLoading(true);
            const fetchOrderSuccessList = async () => {
                try {
                    let data = await addNewOrderSuccess(dataForm);
                    console.log('add new success', data);
                    setEventSubmit(false);
                    setIsLoading(false);
                } catch (error) {
                    setEventSubmit(false);
                    console.log('Failed to fetch company list: ', error);
                    setIsLoading(false);
                }
            }

            fetchOrderSuccessList();
        }

    }, [dataForm])

    useEffect(() => {
        if (checkFirsRerender) {
            let dataAction = addOrder(dataForm);
            dispatch(dataAction);
        } else {
            setCheckFirsRerender(true);
        }
    }, [dataForm])


    // console.log(dataForm, 'dataForm', dataAvatar);

    return (
        <div className="container_user_dashboard">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <CreateForm titleForm='Add Order' thisPage="Order" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}