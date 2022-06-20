import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "react-redux";


export default function EditForm({ titleForm = 'Edit Product', stateForm = [], dataHandle }) {
    const navigate = useNavigate();
    const store = useStore();
    const [dataChangeCurrent, setDataChangeCurrent] = useState([]);
    const [checkSubmit, setCheckSubmit] = useState(false);
    const [listCompany, setListCompany] = useState([]);
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];

    //IMG
    const [totalImg, setTotalImg] = useState(0);
    const [listImgCurrent, setListImgCurrent] = useState([]);
    const [listImg, setListImg] = useState({
        avt: '',
        img: [],
    });
    useEffect(() => {
        let dataImg = [];
        if (totalImg > 0) {
            for (let i = 0; i < totalImg; i++) {
                dataImg[i] = dataChangeCurrent[i].data.img;
                setListImgCurrent(e => {
                    let data = { ...e };
                    data[`l${i}`] = dataImg[i];
                    return data;
                });
            }
        }
    }, [totalImg])

    const handleAddIMG = (e, m, obj, add = '', nPosition) => {
        let files = e.target.files;
        let fileType = (files[0]?.type);
        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            if (m == 'img') {
                if (listAcceptTypeImg.includes(fileType)) {
                    if (add == 'add') {
                        setListImgCurrent(e => {
                            let data = { ...e };
                            data[obj] = [...data[obj] ? data[obj] : []];
                            data[obj] = data[obj].concat([fileReader.result]);
                            return data;
                        });
                    } else {
                        setListImgCurrent(e => {
                            let data = { ...e };
                            data[obj] = data[obj].concat([fileReader.result]);
                            return data;
                        });
                    }
                } else {
                    alert('not type support!');
                }
            } else { //avt
                if (listAcceptTypeImg.includes(fileType)) {
                    setDataChangeCurrent(x => {
                        let data = [...x];
                        data[nPosition].data[m] = fileReader.result;
                        return data;
                    });
                } else {
                    alert('not type support!');
                }
            }

        })
        fileReader.readAsDataURL(files[0])

    }

    const handleRemoveIMG = (obj, nPosition, e) => {
        e.preventDefault();
        setListImgCurrent(z => {
            let data = { ...z };
            let index = data[obj].indexOf(nPosition);
            if (index > -1) {
                data[obj].splice(index, 1);
            }
            return data;
        });
    }
    //END IMG

    // ADD FORM
    const handleAddVariable = (z) => {
        z.preventDefault();
        setDataChangeCurrent(m => {
            let objectNew = {
                variable: '',
                data: {
                    avt: '',
                    img: [
                    ],
                    handleAddIMG: (e, img, ob) => { handleAddIMG(e, img, ob, 'add'); },
                    handleRemoveIMG: (e, img, ob) => { handleRemoveIMG(e, img, ob); },
                    title: '',
                    slug: '',
                    installment: '',
                    sale: '',
                    price: '',
                    company: '',
                    cost: '',
                    promotion: false,
                    infophone: {
                        chip: '',
                        screen: '',
                        ram: '',
                        memory: '',
                    },
                }
            };
            let data = [...m, objectNew];

            return data;
        });
    }
    //END ADD FORM

    const handleChangeNew = (e, name, nPosition) => {
        setDataChangeCurrent(m => {
            let data = [...m];
            if (name == 'variable') {
                data[nPosition].variable = e.target.value;
            } else {
                data[nPosition].data[name] = e.target.value;
            }
            return data;
        });
    }

    useEffect(() => {
        setDataChangeCurrent(store.getState().infoPhone.listSingle);
        setListCompany(store.getState().companyPhone.list);
        setTimeout(() => {
            setTotalImg((store.getState().infoPhone.listSingle).length);
        }, 500);
    }, [])


    // SUBMIT
    useEffect(() => {
        if (checkSubmit) {
            setTimeout(() => {
                setCheckSubmit(false);
                // handle API
            }, 500);
        }
    }, [checkSubmit])

    const handleSubmit = (e) => {
        e.preventDefault();
        for (let i = 0; i < dataChangeCurrent.length; i++) {
            setDataChangeCurrent(x => {
                let dataSet = [...x];
                dataSet[i].data.img = listImgCurrent[`l${i}`];

                return dataSet;
            });
        }
        setCheckSubmit(true);
    }
    //END SUBMIT
    console.log(dataChangeCurrent, 'dataChangeCurrent');
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
                    <form method="">

                        {
                            dataChangeCurrent.map((z, x) => {
                                return (
                                    <div className="break_div_edit" key={x}>
                                        <div className="row mb-3">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="variable"
                                                        name="variable" type="text"
                                                        placeholder="Enter your variable"
                                                        value={z.variable ? z.variable : stateForm.variable}
                                                        onChange={(e) => handleChangeNew(e, 'variable', x)} />
                                                    <label htmlFor="variable">variable</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4 img_list">
                                                <div className="form-floating mb-3 mb-md-0 " >
                                                    <label htmlFor="avt">avt</label>
                                                    <div className="box_img">
                                                        <img src={listImg?.avt == '' ? z.data.avt : listImg?.avt} alt="" />
                                                        <input type="file" onChange={(e) => handleAddIMG(e, 'avt', `l${x}`, '', x)} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4 img_list arr">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <label htmlFor="avt">img</label>
                                                    <div className="box_img arr">
                                                        {
                                                            listImgCurrent[`l${x}`]?.map((i, o) =>
                                                                <div className="box_item_img edit_product" key={o}>
                                                                    <img src={listImg.img.length > 0 ? listImg.img : i} alt="" />
                                                                    <button onClick={(m) =>
                                                                        z.data.handleRemoveIMG ? z.data.handleRemoveIMG(`l${x}`, i, m) : handleRemoveIMG(`l${x}`, i, m)
                                                                    }>Remove</button>
                                                                </div>
                                                            )
                                                        }

                                                        <input type="file" onChange={(e) => z.data.handleAddIMG ? z.data.handleAddIMG(e, 'img', `l${x}`) : handleAddIMG(e, 'img', `l${x}`)} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="title"
                                                        name="title" type="text" onChange={(e) => handleChangeNew(e, 'title', x)}
                                                        placeholder="Enter your title" value={z.data.title ? z.data.title : stateForm.title} />
                                                    <label htmlFor="title">title</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" name="slug" id="slug"
                                                        type="text" onChange={(e) => handleChangeNew(e, 'slug', x)}
                                                        placeholder="Enter your slug" value={z.data.slug ? z.data.slug : stateForm.slug} />
                                                    <label htmlFor="slug">slug</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="sale"
                                                        name="sale" type="text" onChange={(e) => handleChangeNew(e, 'sale', x)}
                                                        placeholder="Enter your sale" value={z.data.sale ? z.data.sale : stateForm.sale} />
                                                    <label htmlFor="sale">sale</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="price"
                                                        name="price" type="text"
                                                        onChange={(e) => handleChangeNew(e, 'price', x)} placeholder="Enter your price" value={z.data.price ? z.data.price : stateForm.price} />
                                                    <label htmlFor="price">price</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0 select_form">
                                                    <select className="form-select" name="company" value={z.data.company ? z.data.company : stateForm.company}
                                                        onChange={(e) => handleChangeNew(e, 'company', x)}
                                                    >
                                                        {
                                                            listCompany.map((i, o) =>
                                                                <option value={i.slug} key={o}>{i.title}</option>
                                                            )
                                                        }

                                                    </select>
                                                    <label >company</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="cost"
                                                        name="cost" type="text"
                                                        onChange={(e) => handleChangeNew(e, 'cost', x)} placeholder="Enter your cost" value={z.data.cost ? z.data.cost : stateForm.cost} />
                                                    <label htmlFor="cost">cost</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            )
                        }

                        <div className="add_variable">
                            <button onClick={(z) => handleAddVariable(z)} className="btn btn-success add_variable">Add Variable</button>
                        </div>

                        <div className="mt-4 mb-0">
                            <div className="d-grid justify-content-end">
                                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}