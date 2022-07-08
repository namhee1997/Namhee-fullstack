import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';
import { sendImageToCloud } from "../../../api/ApiUploadImage";

export default function CreateFormProduct({ listCompany = [], dataHandle }) {

    const listAcceptTypeImg = ['image/png', 'image/jpeg'];
    const [fileImg, setFileImg] = useState('');
    const [idListImg, setidListImg] = useState(0);
    const [ListFileImg, setListFileImg] = useState([]);

    const onFilePicked = async (e, name) => {

        let files = e.target.files;
        let fileType = (files[0]?.type);

        if (files[0]) {
            if (listAcceptTypeImg.includes(fileType)) {
                let fd = new FormData();
                fd.append('file', files[0]);
                let res = await sendImageToCloud(fd);
                setFileImg(res.data.data.fileUrl);
            } else {
                alert('img not support');
            }
        }

    }

    const onFilePickeds = async (e) => {
        let files = e.target.files;

        setidListImg(e => e + 1);
        let fileType = (files[0]?.type);

        if (files[0]) {
            if (listAcceptTypeImg.includes(fileType)) {
                let fd = new FormData();
                fd.append('file', files[0]);
                let res = await sendImageToCloud(fd);
                setListFileImg([
                    ...ListFileImg,
                    {
                        id: idListImg,
                        img: res.data.data.fileUrl
                    }
                ]);
            } else {
                alert('img not support');
            }
        }

    }

    const handleRemoveImgs = (id) => {
        let dataImglist = ListFileImg;
        let resultSlidesMain = dataImglist.filter(e => e.id !== id);
        setListFileImg(resultSlidesMain);
    }



    return (
        <div className="card-body">
            <form action="" method="">
                <div className="row mb-3">
                    <div className="col-md-6 mb-4 flex-100">
                        <div className="form-floating mb-3 mb-md-0 form_input">
                            <input className="form-control variable" id="" name="variable" type="text" placeholder="Enter your variable" />
                            <label htmlFor="variable">variable</label>
                        </div>
                    </div>


                    <div className="col-md-6 mb-4 ">
                        <div className="form-floating mb-3 mb-md-0 form_input">
                            <input className="form-control sale" id="" name="sale" type="text" placeholder="Enter your sale" />
                            <label htmlFor="sale">sale</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 ">
                        <div className="form-floating mb-3 mb-md-0 form_input">
                            <input className="form-control price" id="" name="price" type="text" placeholder="Enter your price" />
                            <label htmlFor="price">price</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 ">
                        <div className={`preview mb-4 ${fileImg == '' ? 'd-none' : ''}`}>
                            <img className="Avatar" width="100%" height="400px" src={fileImg} alt="" id="img" />
                        </div>
                        <div className="input-group ">
                            <input onChange={(e) => onFilePicked(e)} type="file" className="form-control " id="Avatar" aria-describedby="image_button" aria-label="Upload" />
                            <label htmlFor="Avatar">Avatar</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 ">
                        <div className="preview mb-4">
                            {
                                <ul className={`list_img_product `}>
                                    {
                                        ListFileImg.map((e, i) =>
                                            <li key={i}>
                                                <div className="btn_remove_imgs" onClick={() => handleRemoveImgs(e.id)}>
                                                    <i className="fa-solid fa-circle-minus"></i>
                                                </div>
                                                <img width="100%" height="400px" src={e.img} alt="" id="img" />
                                            </li>
                                        )
                                    }
                                </ul>
                            }

                        </div>
                        <div className="input-group">
                            <input type="file" onChange={(e) => onFilePickeds(e)} className="list_img" id="list_img" aria-describedby="image_button" aria-label="Upload" multiple />
                            <label htmlFor="list_img">List IMG</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 ">
                        <div className="form-floating mb-3 mb-md-0 form_input">
                            <input className="form-control cost" id="" name="cost" type="text" placeholder="Enter your cost" />
                            <label htmlFor="cost">cost</label>
                        </div>
                    </div>


                </div>

            </form>
        </div>
    );
}