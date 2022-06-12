import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bannerMain } from "../../../../Action/Action";

export default function ChangeFileImages({ section = '', url = '', changFile = false, data, dataState }) {

    const [handleChangUrl, setHandleChangUrl] = useState({
        url: url,
        changFile: changFile,
    });
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];
    const dispatch = useDispatch();

    const onFilePicked = (e) => {

        let files = e.target.files;
        let fileName = files[0]?.name;
        let fileSize = (files[0]?.size);
        let fileType = (files[0]?.type);

        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {

            if (listAcceptTypeImg.includes(fileType)) {
                if (section == 'slidesMain') {
                    data?.setCheckChangeIs(true);
                    data?.setDataChange([
                        ...data.dataChange,
                        { id: data?.numberSlideMain, url: fileReader.result }
                    ]);
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: fileReader.result,
                    })
                } else if (section == 'bannerMain') {
                    let dataCurrent = data.bannerMain;
                    let resultindex = dataCurrent.findIndex((obj => obj.id === dataState.id));
                    dataCurrent[resultindex].url = fileReader.result;
                    dispatch(bannerMain(dataCurrent));
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: fileReader.result,
                    })
                } else if (section == 'slidesPage') {
                    data?.setCheckChangeIsPage(true);
                    data?.setDataChangePage([
                        ...data?.dataChangePage,
                        { id: data?.numberSlideMain, url: fileReader?.result }
                    ]);
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: fileReader?.result,
                    })
                }

            } else {
                alert('not type support!');
            }
        })
        fileReader.readAsDataURL(files[0])
    }


    return (
        <div className="change_banner">
            <div className="file_input">
                <div className="fileUploadInput">
                    <label>✨ Choose Images</label>
                    <button>
                        +
                        <input type="file" onChange={(e) => onFilePicked(e)} />
                    </button>
                </div>
            </div>
            <div className={`show_img_banner ${handleChangUrl?.url == '' ? 'not_img' : ''}`}>
                <img src={!handleChangUrl.changFile ? handleChangUrl.url : ''} alt="" />
            </div>
        </div>
    );
}