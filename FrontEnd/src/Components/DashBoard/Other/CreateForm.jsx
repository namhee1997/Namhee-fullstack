import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';

export default function CreateForm({ titleForm = '', thisPage = '', stateForm = [], dataHandle }) {
    const navigate = useNavigate();
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];
    const [fileImg, setFileImg] = useState('');
    const [dataTotal, setDataTotal] = useState({});
    const [dataTotal1, setDataTotal1] = useState({});
    const [checkSubmit, setCheckSubmit] = useState(false);
    // let data = {};

    useEffect(() => {
        if (checkSubmit) {
            setTimeout(() => {
                dataHandle.setDataForm(dataTotal);
                dataHandle.setDataAvatar(fileImg);
                setCheckSubmit(false);

            }, 500);
        }
    }, [checkSubmit])


    const onFilePicked = (e, name) => {

        let files = e.target.files;
        let fileType = (files[0]?.type);

        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {

            if (listAcceptTypeImg.includes(fileType)) {
                setFileImg(fileReader.result);
            } else {
                alert('not type support!');
            }
        })
        fileReader.readAsDataURL(files[0])
    }

    const handleChange = (name, e) => {
        // data[name] = e.target.value;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        for (let i = 0; i < stateForm.length; i++) {
            data[stateForm[i].name] = stateForm[i].type == 'select' ? $(`#${stateForm[i].name} option:selected`).val() : $(`#${stateForm[i].name}`).val();
        }
        setDataTotal(data);
        setCheckSubmit(true);
    }



    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">{titleForm}</h1>

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
                <div className="card-body">
                    <form action="" method="">
                        <div className="row mb-3">
                            {
                                stateForm.map((e, i) => {
                                    return (
                                        <div className="col-md-6 mb-4" key={i}>

                                            {
                                                e.type == 'text' || e.type == 'password' ?
                                                    <div className="form-floating mb-3 mb-md-0 form_input">
                                                        <input className="form-control"
                                                            id={e.name} name={e.name}
                                                            type={e.type} placeholder={e.placeholder}
                                                            onChange={(m) => handleChange(e.name, m)}
                                                        />
                                                        <label htmlFor={e.name}>{e.name}</label>
                                                    </div>
                                                    : e.type == 'select' ?
                                                        <div className="form-floating mb-3 mb-md-0 form_input">
                                                            <select className="form-select" id={e.name} name="role"
                                                                onChange={(m) => handleChange(e.name, m)}
                                                            >
                                                                {
                                                                    e.list.map((z, x) =>
                                                                        <option key={x} value={z.slug}>{z.title}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label>{e.name}</label>
                                                        </div>
                                                        : e.type == 'file' ?
                                                            <>
                                                                <div className={`preview mb-4 ${fileImg == '' ? `d-none` : ``}`}>
                                                                    <img width="100%" height="400px" src={fileImg} alt="" id="img" />
                                                                </div>
                                                                <div className="input-group">
                                                                    <input type="file" onChange={(m) => onFilePicked(m, e.name)} className="form-control" id={e.name} aria-describedby="image_button" aria-label="Upload" />
                                                                    <label htmlFor={e.name}>{e.name}</label>
                                                                </div>
                                                            </>
                                                            : ''
                                            }
                                        </div>

                                    );
                                })
                            }

                        </div>

                        <div className="mt-4 mb-0">
                            <div className="d-grid justify-content-end">
                                <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}