import { useEffect, useState } from "react";
import ChangeFileImages from "./ChangeFileImages/ChangeFileImages";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getAllSlidesCustom, addNewSlidesCustom, updateSlidesCustom } from "../../api/ApiSlidesCustom";
import { axiosJWT } from "../../../AxiosJWT";
import { loginSuccess } from "../../../Action/Action";
import $ from 'jquery';
import { iconLoading } from "../../svg/svg";

export default function SlidesMain({ handleRedirect }) {

    const keyJwt = localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = handleRedirect.userCurrentByToken;

    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore()

    // const bannerMainRedux = useSelector(e => e.bannerMain.list);
    // useEffect(() => {
    //     setBannerMain(bannerMainRedux);
    // }, [])
    const [isLoading, setIsLoading] = useState(true);

    const [totalSlidesMain, setTotalSlidesMain] = useState([]);
    const [totalSlidesPage, setTotalSlidesPage] = useState([]);

    const [numberSlideMain, setNumberSlideMain] = useState(1);
    const [checkChangeIs, setCheckChangeIs] = useState(true);
    const [checkChangeIsPage, setCheckChangeIsPage] = useState(true);
    const [checkOnchange, setCheckOnchange] = useState(false);
    //Slides main

    const [slidesMain, setSlidesMain] = useState([]);
    //end Slides main

    //banner main
    const [bannerMain, setBannerMain] = useState([]);
    const [idSlide, setIdSlide] = useState();

    //end banner main

    //Slides page

    const [slidesPage, setSlidesPage] = useState([]);
    const [reRender, setReRender] = useState(true);

    useEffect(() => {
        let axiosJwt = axiosJWT(user, dispatch, loginSuccess, keyJwt);
        const fetchGetAllSlides = async () => {
            try {
                let data = await getAllSlidesCustom(keyJwt, axiosJwt);
                console.log('get all slide success', data);
                setBannerMain(data[0].bannermain);
                setSlidesPage(data[0].slidespage);
                setSlidesMain(data[0].slidesmain);
                setIdSlide(data[0]._id);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log('get all slide err 1');
            }
        }
        fetchGetAllSlides();

    }, [reRender])
    //end Slides page

    const [handleChangSlidesMain, setHandleChangSlidesMain] = useState([]);
    const [handleChangSlidesPage, setHandleChangSlidesPage] = useState([]);
    const [dataChange, setDataChange] = useState([]);
    const [dataChangePage, setDataChangePage] = useState([]);

    const handleAddNewSlideMain = () => {
        setNumberSlideMain(e => e + 1);
        setCheckChangeIs(false);
        setHandleChangSlidesMain([
            ...handleChangSlidesMain,
            { id: numberSlideMain, url: '', element: <ChangeFileImages section='slidesMain' data={data} /> }
        ]);
    }

    const handleAddNewSlidePage = () => {
        setNumberSlideMain(e => e + 1);
        setCheckChangeIsPage(false);
        setHandleChangSlidesPage([
            ...handleChangSlidesPage,
            { id: numberSlideMain, url: '', element: <ChangeFileImages section='slidesPage' data={data} /> }
        ]);
    }
    const [removeBannerRerender, setRemoveBannerRerender] = useState(true);

    const handleRemoveSlidesMain = (id) => {
        console.log('remove slides main', id);

        setSlidesMain(zx => {
            let data = [...zx];
            let resultBannerPages = data.filter(e => e._id != id);

            return resultBannerPages;
        });

        setRemoveBannerRerender(!removeBannerRerender);
    }

    const handleRemoveSlidesPage = (id) => { //banner page

        console.log('remove banner pages', id);

        setSlidesPage(zx => {
            let data = [...zx];
            let resultBannerPages = data.filter(e => e._id != id);

            return resultBannerPages;
        });

        setRemoveBannerRerender(!removeBannerRerender);

    }

    let data = {
        setDataChange,
        setDataChangePage,
        numberSlideMain,
        dataChange,
        dataChangePage,
        setCheckChangeIs,
        setCheckChangeIsPage,
        setReRender,
        setBannerMain,
        setSlidesMain,
        setSlidesPage,
        setCheckOnchange,
        removeBannerRerender,
    }

    useEffect(() => {
        setTotalSlidesMain(slidesMain.concat(dataChange));
        setTotalSlidesPage(slidesPage.concat(dataChangePage));
    }, [slidesMain, slidesPage, dataChange, dataChangePage])

    const [resultSlides, setResultSlides] = useState({});

    useEffect(() => {
        if (Object.keys(resultSlides).length > 0) {
            setIsLoading(true);

            const fetchAddSlides = async () => {
                try {
                    // let data = await addNewSlidesCustom(resultSlides);
                    let data = await updateSlidesCustom(resultSlides);
                    console.log('add slide success', data);
                    setIsLoading(false);

                } catch (error) {
                    setIsLoading(false);
                    console.log('add slides err 1');
                }
            };
            fetchAddSlides();

        }
    }, [resultSlides])

    const submitSlides = () => {


        let slidesMainDom = $('.slides_main.only ul li');
        let bannerMainDom = $('.slides_main.banner_top_main   ul li');
        let bannerPageDom = $('.slides_main.banner_page_main  ul li');
        let slidesMainArr = [];
        let bannerMainArr = [];
        let bannerPageArr = [];
        for (let i = 0; i < slidesMainDom.length; i++) {
            let obj = {};
            obj.url = $($('.slides_main.only ul li img')[i]).attr('src');
            slidesMainArr.push(obj);
        }
        for (let i = 0; i < bannerMainDom.length; i++) {
            let obj = {};
            obj.url = $($('.slides_main.banner_top_main ul li img')[i]).attr('src');
            bannerMainArr.push(obj);
        }
        for (let i = 0; i < bannerPageDom.length; i++) {
            let obj = {};
            obj.url = $($('.slides_main.banner_page_main ul li img')[i]).attr('src');
            bannerPageArr.push(obj);
        }

        setResultSlides(e => {

            let data = {
                slidesmain: slidesMainArr,
                bannermain: bannerMainArr,
                slidespage: bannerPageArr,
                _id: idSlide
            };
            console.log(data, 'bannerPageArr');
            return data;
        })

    }

    useEffect(() => {
        if (checkOnchange) {
            setSlidesPage(totalSlidesPage);
            setSlidesMain(totalSlidesMain);
            setCheckOnchange(false);
            setHandleChangSlidesMain([]);
            setHandleChangSlidesPage([]);
        }
    }, [checkOnchange])

    // console.log(slidesMain, 'slidesMain', bannerMain, 'bannermain');

    return (
        <div className="container_user_dashboard slides">
            {
                isLoading ? <div className="overlay_load">
                    <span>{iconLoading}</span>
                </div> : ''
            }
            <div className="slides_main only box_shadow">
                <h2>Slides main</h2>
                <ul>
                    {
                        slidesMain.map((e, i) => {
                            return (

                                <li key={i}>
                                    <ChangeFileImages url={e.url} section='slidesMain' data={data} dataState={e} />
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesMain(e._id)}>
                                        <i className="fa-solid fa-trash-can "></i>
                                    </div>
                                </li>
                            );
                        })
                    }
                    {
                        handleChangSlidesMain.map((e, i) => {
                            return (
                                <li key={i}>
                                    {e?.element}
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesMain(e?._id)}>
                                        <i className="fa-solid fa-trash-can "></i>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                {
                    checkChangeIs ?
                        <button
                            className="add_new"
                            onClick={() => handleAddNewSlideMain()}
                        >Add New</button>
                        : ``
                }


            </div>

            <div className="slides_main banner_top_main box_shadow">
                <h2>Banner main</h2>
                <ul>
                    {
                        bannerMain.map((e, i) =>
                            <li key={i}>
                                <ChangeFileImages section='bannerMain' url={e.url} dataState={e} data={data} />
                            </li>
                        )
                    }

                </ul>

            </div>

            <div className="slides_main banner_page_main box_shadow">
                <h2>Banner Page</h2>
                <ul>
                    {
                        slidesPage.map((e, i) =>
                            <li key={i}>
                                <ChangeFileImages url={e.url} section='slidesPage' data={data} dataState={e} />
                                <div className="remove_banner" onClick={() => handleRemoveSlidesPage(e?._id)}>
                                    <i className="fa-solid fa-trash-can "></i>
                                </div>
                            </li>
                        )
                    }
                    {
                        handleChangSlidesPage.map((e, i) => {
                            return (
                                <li key={i}>
                                    {e?.element}
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesPage(e?._id)}>
                                        <i className="fa-solid fa-trash-can "></i>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                {
                    checkChangeIsPage ?
                        <button
                            className="add_new"
                            onClick={() => handleAddNewSlidePage()}
                        >Add New</button>
                        : ``
                }

            </div>
            <button className="save_slides" onClick={() => submitSlides()}>Save</button>
        </div>
    );
}