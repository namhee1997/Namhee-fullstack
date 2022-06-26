import { useState, useEffect } from 'react';
import CreateForm from '../Other/CreateForm';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../../Action/Action';

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

    let dataHandle = {
        setDataForm,
        setDataAvatar,
    }

    useEffect(() => {
        if (checkFirsRerender) {
            let dataAction = addOrder(dataForm);
            dispatch(dataAction);
        } else {
            setCheckFirsRerender(true);
        }
    }, [dataForm])


    console.log(dataForm, 'dataForm', dataAvatar);

    return (
        <div className="container_user_dashboard">
            <CreateForm titleForm='Add Order' thisPage="Order" stateForm={stateForm} dataHandle={dataHandle} />
        </div>
    );
}