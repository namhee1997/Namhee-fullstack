import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendImageToCloud } from "../../api/ApiUploadImage";
import $ from 'jquery';

export default function EditForm({ titleForm = '', thisPage = '', stateForm = {}, dataHandle }) {
    const navigate = useNavigate();
    const [dataChangeNew, setDataChangeNew] = useState({});
    const [checkSubmit, setCheckSubmit] = useState(false);
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];

    const handleChangeNew = async (e, name, fileTypeCheck = '') => {
        if (fileTypeCheck == 'file') {
            let files = e.target.files;
            let fileType = (files[0]?.type);
            if (files[0]) {
                if (listAcceptTypeImg.includes(fileType)) {
                    let fd = new FormData();
                    fd.append('file', files[0]);
                    let res = await sendImageToCloud(fd);
                    console.log(res, 'set update img');
                    setDataChangeNew(m => {
                        let data = { ...m };
                        data['avatar'] = res.data.data.fileUrl;
                        return data;
                    });
                } else {
                    alert('img not support');
                }
            }

        } else {
            setDataChangeNew(m => {
                let data = { ...m };
                data[name] = e.target.value;
                return data;
            });
        }
    }

    useEffect(() => {
        setDataChangeNew(stateForm);
    }, [stateForm])

    useEffect(() => {
        if (checkSubmit) {
            setTimeout(() => {
                dataHandle.setDataChangeNew(dataChangeNew);
                setCheckSubmit(false);
                dataHandle?.setHandleSubmit(true);
            }, 500);
        }
    }, [checkSubmit])

    const handleSubmit = (e) => {
        e.preventDefault();
        setCheckSubmit(true);
    }

    console.log(dataChangeNew, 'dataChangeNew');



    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">{titleForm}</h1>

            <div className="card mb-4">
                <div className="card-header d-flex align-items-center">
                    <svg className="svg-inline--fa fa-table me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z"></path></svg>
                    Edit
                    <button type="button" className="btn btn-primary ms-auto">
                        <Link to="/users" className="text-white text-decoration-none"
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
                    {
                        thisPage == 'User' ?
                            <div className="row mb-3">
                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control  get_value" id="username"
                                            name="username" type="text"
                                            placeholder="Enter your username"
                                            value={dataChangeNew?.username ? dataChangeNew?.username : stateForm?.username ? stateForm?.username : ''}
                                            onChange={(e) => handleChangeNew(e, 'username')} />
                                        <label htmlFor="username">username</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control  get_value" id="password" name="password"
                                            type="text" placeholder="Enter your password"
                                            onChange={(e) => handleChangeNew(e, 'password')}
                                            value={dataChangeNew?.password ? dataChangeNew?.password : stateForm?.password ? stateForm?.password : ''} />
                                        <label htmlFor="password">password</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <select className="form-select  get_value" name="role"
                                            value={dataChangeNew?.role ? dataChangeNew?.role : stateForm?.role ? stateForm?.role : ''}
                                            onChange={(e) => handleChangeNew(e, 'role')}
                                        >
                                            <option value="admin">admin
                                            </option>
                                            <option value="user" >user
                                            </option>
                                        </select>
                                        <label >role</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control  get_value" id="fullname"
                                            name="fullname" type="text" onChange={(e) => handleChangeNew(e, 'fullname')}
                                            placeholder="Enter your firstname"
                                            value={dataChangeNew?.fullname ? dataChangeNew?.fullname : stateForm?.fullname ? stateForm?.fullname : ''} />
                                        <label htmlFor="fullname">fullname</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control  get_value" name="address" id="address"
                                            type="text" onChange={(e) => handleChangeNew(e, 'address')}
                                            placeholder="Enter your address"
                                            value={dataChangeNew?.address ? dataChangeNew?.address : stateForm?.address ? stateForm?.address : ''} />
                                        <label htmlFor="address">address</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control  get_value" id="email"
                                            name="email" type="text" onChange={(e) => handleChangeNew(e, 'email')}
                                            placeholder="Enter your email"
                                            value={dataChangeNew?.email ? dataChangeNew?.email : stateForm?.email ? stateForm?.email : ''} />
                                        <label htmlFor="email">email</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                        <input className="form-control get_value" id="phone"
                                            name="phone" type="text"
                                            onChange={(e) => handleChangeNew(e, 'phone')} placeholder="Enter your phone"
                                            value={dataChangeNew?.phone ? dataChangeNew?.phone : stateForm?.phone ? stateForm?.phone : ''} />
                                        <label htmlFor="phone">phone</label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="preview mb-4">
                                        <img width="100%" height="400px" className=" get_value" name="avatar"
                                            src={dataChangeNew?.avatar ? dataChangeNew?.avatar : stateForm?.avatar ? stateForm?.avatar : ''} alt="" id="img" />
                                    </div>
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="file"
                                            onChange={(e) => handleChangeNew(e, 'avatar', 'file')}
                                            aria-describedby="image_button" aria-label="Upload" />
                                    </div>
                                </div>

                            </div>
                            : thisPage == 'News' ?
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                            <input className="form-control get_value" id="title12"
                                                name="title12" type="text"
                                                placeholder="Enter your title"
                                                value={dataChangeNew?.title ? dataChangeNew?.title : stateForm?.title ? stateForm?.title : ''}
                                                onChange={(e) => handleChangeNew(e, 'title12')} />
                                            <label htmlFor="title12">title</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                            <input className="form-control get_value" id="slug" name="slug"
                                                type="text" placeholder="Enter your slug"
                                                onChange={(e) => handleChangeNew(e, 'slug')}
                                                value={dataChangeNew?.slug ? dataChangeNew?.slug : stateForm?.slug ? stateForm?.slug : ''} />
                                            <label htmlFor="slug">slug</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                            <input className="form-control get_value" id="urlTo" name="urlTo"
                                                type="text" placeholder="Enter your urlTo"
                                                onChange={(e) => handleChangeNew(e, 'urlTo')}
                                                value={dataChangeNew?.urlTo ? dataChangeNew?.urlTo : stateForm?.urlTo ? stateForm?.urlTo : ''} />
                                            <label htmlFor="urlTo">urlTo</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-floating mb-3 mb-md-0 flex_column_re">
                                            <input className="form-control get_value" id="content" name="content"
                                                type="text" placeholder="Enter your content"
                                                onChange={(e) => handleChangeNew(e, 'content')}
                                                value={dataChangeNew?.content ? dataChangeNew?.content : stateForm?.content ? stateForm?.content : ''} />
                                            <label htmlFor="content">content</label>
                                        </div>
                                    </div>

                                </div>
                                : ""
                    }

                    <div className="mt-4 mb-0">
                        <div className="d-grid justify-content-end">
                            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}