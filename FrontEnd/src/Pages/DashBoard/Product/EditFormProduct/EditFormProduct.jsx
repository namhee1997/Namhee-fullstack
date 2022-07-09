import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from '../../../api/ApiProduct';
import { loginSuccess } from "../../../../Action/Action";
import { useDispatch, useStore } from "react-redux";
import { axiosJWT } from "../../../../AxiosJWT";
import { sendImageToCloud } from '../../../api/ApiUploadImage';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';
import { iconLoading } from "../../../svg/svg";

export default function EditForm({ titleForm = 'Edit Product', stateForm = [], dataHandle }) {
    const navigate = useNavigate();
    const store = useStore();
    const params = useParams();

    //setup api
    const dispatch = useDispatch();
    const keyJwt = localStorage.getItem('token');
    const user = jwtDecode(keyJwt);

    //end
    const [isLoading, setIsLoading] = useState(true);

    const [dataChangeCurrent, setDataChangeCurrent] = useState([]);
    const [dataChangeNew, setDataChangeNew] = useState({});
    const [checkSubmit, setCheckSubmit] = useState(false);
    const [listCompany, setListCompany] = useState([]);
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];

    //IMG
    const [totalImg, setTotalImg] = useState(0);
    const [listImgCurrent, setListImgCurrent] = useState({});
    const [listImg, setListImg] = useState({});
    useEffect(() => {
        let dataImg = [];
        let dataAvatar = [];
        if (totalImg > 0) {
            for (let i = 0; i < totalImg; i++) {
                dataImg[i] = dataChangeCurrent[0].variable[i].listimg;
                dataAvatar[i] = dataChangeCurrent[0].variable[i].avatar;
                setListImgCurrent(e => {
                    let data = { ...e };
                    data[`l${i}`] = dataImg[i];
                    return data;
                });
                setListImg(e => {
                    let data = { ...e };
                    data[`l${i}`] = dataAvatar[i];
                    return data;
                });
            }
        }
    }, [totalImg])

    const handleAddIMG = async (e, m, obj, add = '', nPosition) => {
        let files = e.target.files;
        let fileType = (files[0]?.type);
        setIsLoading(true);

        if (m == 'listimg') {
            if (listAcceptTypeImg.includes(fileType)) {

                let fd = new FormData();
                fd.append('file', files[0]);
                let res = await sendImageToCloud(fd);

                if (add == 'add') {
                    setListImgCurrent(e => {
                        let data = { ...e };
                        data[obj] = [...data[obj] ? data[obj] : []];
                        data[obj] = data[obj].concat([{ thumb: res.data.data.fileUrl }]);
                        return data;
                    });
                } else {
                    setListImgCurrent(e => {
                        let data = { ...e };
                        data[obj] = data[obj].concat([{ thumb: res.data.data.fileUrl }]);
                        return data;
                    });
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
                alert('not type support!');
            }
        } else { //avt
            if (listAcceptTypeImg.includes(fileType)) {
                let fd = new FormData();
                fd.append('file', files[0]);
                let res = await sendImageToCloud(fd);

                setListImg(e => {
                    let data = { ...e };
                    data[`l${nPosition}`] = res.data.data.fileUrl;
                    return data;
                });

                setIsLoading(false);
            } else {
                setIsLoading(false);
                alert('not type support!');
            }
        }

    }

    const handleRemoveIMG = (obj, nPosition, e, o) => {
        e.preventDefault();
        setListImgCurrent(z => {
            let data = { ...z };
            let index = data[obj].indexOf(nPosition);
            // console.log('remove ', index, data[obj]);
            // data[obj].splice(nPosition, 1);
            delete data[obj][nPosition];
            if (index > -1) {
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

                avatar: "",
                cost: '',
                idVariable: "",
                listimg: [],
                price: '',
                sale: '',
                title: "",
                handleAddIMG: (e, img, ob, o) => { handleAddIMG(e, img, ob, 'add', o); },
                handleRemoveIMG: (e, img, ob, o) => { handleRemoveIMG(e, img, ob, o); },
                infophone: {
                    chip: '',
                    screen: '',
                    ram: '',
                    memory: '',
                },

            };
            let data = [...m];

            data[0].variable = [...data[0].variable, objectNew]

            return data;
        });
    }
    //END ADD FORM

    //change new data
    const [newsData, setNewData] = useState({
        title: '',
        company: '',
        slug: '',
        promotion: '',
    });
    const [newsDataInfoPhone, setNewDataInfoPhone] = useState({
        chip: '',
        screen: '',
        ram: '',
        memory: '',
    });
    const [newsDataVariable, setNewDataVariable] = useState({});

    const handleChangeNew = (e, name, nPosition) => {

        if (name == 'chip' || name == 'screen' || name == 'ram' || name == 'memory') {
            setNewDataInfoPhone(m => {
                let data = { ...m };
                data[name] = e.target.value;

                return data;
            });
        } else {
            if (nPosition !== undefined) {
                setNewDataVariable(m => {
                    let data = { ...m };
                    let obj = { ...data[nPosition] };
                    obj[name] = e.target.value;

                    data[`${nPosition}`] = obj;

                    return data;
                });
            } else {
                setNewData(m => {
                    let data = { ...m };
                    data[name] = e.target.value;

                    return data;

                });
            }
        }

    }

    useEffect(() => {

        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchByIdProduct = async () => {
            try {
                let data = await getProductById(keyJwt, axiosJwt, params.slug);

                console.log('data success product by id', data);
                setDataChangeCurrent(data);
                setTotalImg((data[0]?.variable).length);
                setIsLoading(false);

            } catch (error) {
                console.log('get product by id err 1');
                setIsLoading(false);
            }
        }
        fetchByIdProduct();
        setListCompany(store.getState().companyPhone.list);

    }, [])


    // SUBMIT
    useEffect(() => {
        if (checkSubmit) {
            setIsLoading(true);

            setTimeout(() => {
                const fetchUpdateProduct = async () => {
                    try {
                        let data = await updateProduct(dataChangeNew);
                        console.log('update success', data);

                        setIsLoading(false);
                        return data;
                    } catch (error) {
                        console.log('update fail 1');
                        setIsLoading(false);
                    }
                }


                fetchUpdateProduct();

                setCheckSubmit(false);
            }, 500);
        }
    }, [checkSubmit])

    const handleSubmit = (e) => {
        e.preventDefault();
        let arrVariable = [];
        let listImgArr = [];
        for (let i = 0; i < $('.break_div_edit').length; i++) {
            listImgArr[i] = []

            for (let zx = 0; zx < $(`.list_number${i}`).length; zx++) {
                if ($($(`.list_number${i} img`)[zx]).attr('id')) {

                    listImgArr[i].push(
                        {
                            thumb: $($(`.list_number${i} img`)[zx]).attr('src'),
                            // _id: $($(`.list_number${i} img`)[zx]).attr('id') || ''
                        }
                    );
                } else {
                    listImgArr[i].push(
                        {
                            thumb: $($(`.list_number${i} img`)[zx]).attr('src'),
                        }
                    );
                }

            }

            let obj = {
                avatar: $($('.box_img.string')[i]).find('img').attr('src'),
                cost: parseInt($($('input.cost')[i]).val()),
                listimg: listImgArr[i],
                price: parseInt($($('input.price')[i]).val()),
                sale: parseInt($($('input.sale')[i]).val()),
                title: $($('input.variable')[i]).val(),
                idVariable: $($('.break_div_edit')[i]).attr('idvariable'),
            };
            if ($($('input.variable')[i]).val() != '') {
                arrVariable.push(obj);
            }
        }

        let data = {
            company: $('select.form-select.company option:selected').val(),
            promotion: $(".form-select.promotion option:selected").val(),
            slug: $('input.form-control.slug').val(),
            title: $('input.form-control.title').val(),
            _id: dataChangeCurrent[0]._id,
            infophone: {
                chip: $('input#chip').val(),
                screen: $('input#screen').val(),
                ram: $('input#ram').val(),
                memory: $('input#memory').val(),
            },
            variable: arrVariable,
        };

        setDataChangeNew(data);
        setCheckSubmit(true);
    }
    //END SUBMIT
    return (
        <div className="container-fluid px-4">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
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
                <div className="form_product">
                    <div className="row mb-3">
                        <div className="col-md-6 mb-4 flex-100">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control title"
                                    value={newsData.title != '' ? newsData.title : dataChangeCurrent[0]?.title || ''} name="title" type="text" placeholder="Enter your title"
                                    onChange={(v) => handleChangeNew(v, 'title')}
                                />
                                <label htmlFor="title">Title</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control slug"
                                    value={newsData.slug != '' ? newsData.slug : dataChangeCurrent[0]?.slug || ''} name="slug" type="text" placeholder="Enter your slug"
                                    onChange={(v) => handleChangeNew(v, 'slug')} />
                                <label htmlFor="slug">slug</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <select className="form-select promotion" id=""
                                    value={newsData.promotion != '' ? newsData.promotion == 'true' ? 'true' : 'false' : dataChangeCurrent[0]?.promotion ? 'true' : 'false' || ''} name="role"
                                    onChange={(v) => handleChangeNew(v, 'promotion')} >
                                    <option value="true">true</option>
                                    <option value='false'>false</option>
                                </select>
                                <label>promotion</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <select className="form-select company" id="" name="role"
                                    value={newsData.company != '' ? newsData.company : dataChangeCurrent[0]?.company || ''}
                                    onChange={(v) => handleChangeNew(v, 'company')} >
                                    {
                                        listCompany?.map((e, i) =>
                                            <option key={i} value={e.slug}>{e.title}</option>
                                        )
                                    }

                                </select>
                                <label>company</label>
                            </div>
                        </div>
                        {/*  */}
                        <div className="col-md-6 mb-4">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control" id="chip"
                                    name="chip" type="text"
                                    onChange={(e) => handleChangeNew(e, 'chip')}
                                    placeholder="Enter your chip"
                                    value={newsDataInfoPhone?.chip != '' ? newsDataInfoPhone?.chip : dataChangeCurrent[0]?.infophone?.chip || ''} />
                                <label htmlFor="chip">chip</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control" id="screen"
                                    name="screen" type="text"
                                    onChange={(e) => handleChangeNew(e, 'screen')}
                                    placeholder="Enter your screen"
                                    value={newsDataInfoPhone?.screen != '' ? newsDataInfoPhone?.screen : dataChangeCurrent[0]?.infophone?.screen || ''} />
                                <label htmlFor="screen">screen</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control" id="ram"
                                    name="ram" type="text"
                                    onChange={(e) => handleChangeNew(e, 'ram')}
                                    placeholder="Enter your ram"
                                    value={newsDataInfoPhone?.ram != '' ? newsDataInfoPhone?.ram : dataChangeCurrent[0]?.infophone?.ram || ''} />
                                <label htmlFor="ram">ram</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-floating mb-3 mb-md-0 form_input">
                                <input className="form-control" id="memory"
                                    name="memory" type="text"
                                    onChange={(e) => handleChangeNew(e, 'memory')}
                                    placeholder="Enter your memory"
                                    value={newsDataInfoPhone?.memory != '' ? newsDataInfoPhone?.memory : dataChangeCurrent[0]?.infophone?.memory || ''} />
                                <label htmlFor="memory">memory</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form method="">

                        {
                            dataChangeCurrent[0]?.variable?.map((z, x) => {
                                return (
                                    <div className="break_div_edit" key={x} {...{ "idvariable": `${z.idVariable}` }} >
                                        <div className="row mb-3">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control variable" id="variable"
                                                        name="variable" type="text"
                                                        placeholder="Enter your variable"
                                                        value={newsDataVariable?.[`${x}`]?.title ? newsDataVariable?.[`${x}`]?.title : z?.title || ''}
                                                        onChange={(e) => handleChangeNew(e, 'title', x)} />
                                                    <label htmlFor="variable">variable</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4 img_list">
                                                <div className="form-floating mb-3 mb-md-0 " >
                                                    <label htmlFor="avt">avatar</label>
                                                    <div className="box_img string">
                                                        <img src={listImg[`l${x}`] || ''} alt="" />
                                                        <input type="file" onChange={(e) => handleAddIMG(e, 'avatar', `l${x}`, '', x)} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4 img_list arr">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <label htmlFor="avt">img</label>
                                                    <div className="box_img arr">
                                                        {
                                                            listImgCurrent[`l${x}`]?.map((i, o) =>
                                                                <div className={`box_item_img edit_product list_number${x} img${o}`} key={o}>
                                                                    <img src={i?.thumb || ''} alt="" id={i._id} />
                                                                    <button onClick={(m) =>
                                                                        z.handleRemoveIMG ? z.handleRemoveIMG(`l${x}`, o, m) : handleRemoveIMG(`l${x}`, o, m)
                                                                    }>Remove</button>
                                                                </div>
                                                            )
                                                        }

                                                        <input type="file"
                                                            onChange={(e) => z.handleAddIMG ? z.handleAddIMG(e, 'listimg', `l${x}`) : handleAddIMG(e, 'listimg', `l${x}`)} />
                                                    </div>
                                                </div>
                                            </div>




                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control sale" id="sale"
                                                        name="sale" type="text" onChange={(e) => handleChangeNew(e, 'sale', x)}
                                                        placeholder="Enter your sale"
                                                        value={newsDataVariable?.[`${x}`]?.sale ? newsDataVariable?.[`${x}`]?.sale : z?.sale || ''} />
                                                    <label htmlFor="sale">sale</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control price" id="price"
                                                        name="price" type="text"
                                                        onChange={(e) => handleChangeNew(e, 'price', x)}
                                                        placeholder="Enter your price"
                                                        value={newsDataVariable?.[`${x}`]?.price ? newsDataVariable?.[`${x}`]?.price : z?.price || ''} />
                                                    <label htmlFor="price">price</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control cost" id="cost"
                                                        name="cost" type="text"
                                                        onChange={(e) => handleChangeNew(e, 'cost', x)}
                                                        placeholder="Enter your cost"
                                                        value={newsDataVariable?.[`${x}`]?.cost ? newsDataVariable?.[`${x}`]?.cost : z?.cost || ''} />
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