import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bannerMain } from "../../../../Action/Action";
import { sendImageToCloud } from '../../../api/ApiUploadImage';

export default function ChangeFileImages({ section = '', url = '', changFile = false, data, dataState }) {

    const [handleChangUrl, setHandleChangUrl] = useState({
        url: url,
        changFile: changFile,
    });
    useEffect(() => {
        setHandleChangUrl({
            ...handleChangUrl,
            url: url,
        });
    }, [data.removeBannerRerender])
    const listAcceptTypeImg = ['image/png', 'image/jpeg'];
    const dispatch = useDispatch();

    const onFilePicked = async (e, check) => {
        //check == true -> add

        let files = e.target.files;
        let fileType = (files[0]?.type);

        if (listAcceptTypeImg.includes(fileType)) {
            let fd = new FormData();
            fd.append('file', files[0]);
            let res = await sendImageToCloud(fd);
            console.log(res, 'set update img');
            console.log('this check', check, section);
            if (check) {
                if (section == 'slidesMain') {
                    data?.setCheckChangeIs(true);
                    data?.setDataChange([
                        ...data.dataChange,
                        { _id: data?.numberSlideMain, url: res?.data?.data?.fileUrl }
                    ]);
                    // setHandleChangUrl({
                    //     ...handleChangUrl,
                    //     url: res?.data?.data?.fileUrl,
                    // })

                    setTimeout(() => {
                        data?.setCheckOnchange(true);
                    }, 500);
                } else if (section == 'bannerMain') {
                    let dataCurrent = data.bannerMain;
                    let resultindex = dataCurrent.findIndex((obj => obj.id === dataState.id));
                    dataCurrent[resultindex].url = res?.data?.data?.fileUrl;
                    dataCurrent[resultindex]._id = dataCurrent[resultindex]._id;
                    dispatch(bannerMain(dataCurrent));
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: res?.data?.data?.fileUrl,
                    })
                    setTimeout(() => {
                        data?.setCheckOnchange(true);
                    }, 500);
                } else if (section == 'slidesPage') {
                    data?.setCheckChangeIsPage(true);
                    data?.setDataChangePage([
                        ...data?.dataChangePage,
                        { _id: data?.numberSlideMain, url: res?.data?.data?.fileUrl }
                    ]);
                    // setHandleChangUrl({
                    //     ...handleChangUrl,
                    //     url: res?.data?.data?.fileUrl,
                    // })
                    setTimeout(() => {
                        data?.setCheckOnchange(true);
                    }, 500);
                }
            } else {
                console.log('not check');
                if (section == 'slidesMain') {
                    data?.setCheckChangeIs(true);
                    data?.setSlidesMain(zx => {
                        let dataList = [...zx];
                        let idCurrent = dataState._id;
                        let index = dataList.findIndex((obj => obj._id === idCurrent))
                        dataList[index].url = res?.data?.data?.fileUrl;

                        return dataList;
                    });
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: res?.data?.data?.fileUrl,
                    })
                } else if (section == 'bannerMain') {
                    data?.setBannerMain(zx => {

                        let dataCurrent = [...zx];
                        let idCurrent = dataState._id;
                        let resultindex = dataCurrent.findIndex((obj => obj._id === idCurrent));
                        dataCurrent[resultindex].url = res?.data?.data?.fileUrl;
                        dataCurrent[resultindex]._id = dataCurrent[resultindex]._id;
                        return dataCurrent;
                    });
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: res?.data?.data?.fileUrl,
                    })
                } else if (section == 'slidesPage') {
                    data?.setCheckChangeIsPage(true);
                    data?.setSlidesPage(zx => {

                        let dataCurrent = [...zx];
                        let idCurrent = dataState._id;
                        let resultindex = dataCurrent.findIndex((obj => obj._id === idCurrent));
                        dataCurrent[resultindex].url = res?.data?.data?.fileUrl;
                        return dataCurrent;
                    });
                    setHandleChangUrl({
                        ...handleChangUrl,
                        url: res?.data?.data?.fileUrl,
                    })
                }
            }
        } else {
            alert('img not support');
        }




        // console.log(section, dataState, 'section', check);

    }




    return (
        <div className="change_banner">
            <div className="file_input">
                <div className="fileUploadInput">
                    <label>✨ Choose Images</label>
                    <button>
                        +
                        <input type="file" onChange={(e) => onFilePicked(e, url == '' ? true : false)} />
                    </button>
                </div>
            </div>
            <div className={`show_img_banner ${handleChangUrl?.url == '' ? 'not_img' : ''}`}>
                <img src={!handleChangUrl.changFile ? handleChangUrl.url : ''} alt="" />
            </div>
        </div>
    );
}