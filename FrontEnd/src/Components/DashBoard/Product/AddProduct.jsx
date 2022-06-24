import { useState, useEffect } from 'react';
import CreateFormProduct from './CreateFormProduct/CreateFormProduct';
import { useStore, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery'

export default function AddProduct({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const data = useSelector(e => e.companyPhone.list)
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState([]);
    const [checkSubmit, setCheckSubmit] = useState(false);
    const [handleChangeVariable, setHandleChangeVariable] = useState([]);
    const [numberVariable, setNumberVariable] = useState(1);
    const [checkChangeIsVariable, setCheckChangeIsVariable] = useState(true);

    let dataHandle = {
        setCheckChangeIsVariable,
    }

    useEffect(() => {
        if (checkSubmit) {
            let listForm = $('.card-body');
            let data = [];
            let listImg = [];

            for (let i = 0; i < listForm.length; i++) {
                listImg[i] = []
                $($(".list_img_product")[i]).find('img').map((z, x) => {
                    listImg[i].push($(x).attr('src'));
                })
                data.push({
                    variable: $($(".variable")[i]).val(),
                    data: {
                        avatar: $($(".Avatar")[i]).attr('src'),
                        img: listImg[i]
                    }
                })
            }
            setDataForm(data);
            setCheckSubmit(false);
        }
    }, [checkSubmit])

    const handleSubmit = (e) => {
        e.preventDefault();
        setCheckSubmit(true);
    }
    const handleAddVariable = () => {
        setNumberVariable(e => e + 1);
        setHandleChangeVariable([
            ...handleChangeVariable,
            { id: numberVariable, url: '', element: <CreateFormProduct listCompany={data} dataHandle={dataHandle} /> }
        ])
    }
    console.log(dataForm, 'dataForm');

    return (
        <div className="container_user_dashboard">
            <div className="container-fluid px-4">
                <h1 className="mt-4">Add Product</h1>

                <div className="card mb-4">
                    <div className="card-header d-flex align-items-center">
                        <svg className="svg-inline--fa fa-table me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z"></path></svg>
                        Create new
                        <button type="button"
                            className="btn btn-primary ms-auto"

                        >
                            <Link to="/" className="text-white text-decoration-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    return navigate(-1);
                                }}
                            >
                                <svg className="svg-inline--fa fa-rotate-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"></path></svg> Back
                            </Link>
                        </button>
                    </div>
                    <CreateFormProduct listCompany={data} dataHandle={dataHandle} />
                    {
                        handleChangeVariable.map((e, i) => {
                            return (
                                <div key={i}>
                                    {
                                        e.element
                                    }
                                </div>
                            );
                        })
                    }
                    {
                        checkChangeIsVariable ?
                            <button className='btn btn-success add_variable'
                                onClick={() => handleAddVariable()}
                            >Add Variable</button>
                            : ''
                    }

                </div>
                <div className="mt-4 mb-0">
                    <div className="d-grid justify-content-end">
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}