import { useEffect, useState } from "react";
import ChangeFileImages from "./ChangeFileImages/ChangeFileImages";
import { useDispatch, useSelector, useStore } from "react-redux";

export default function SlidesMain({ handleRedirect }) {
    useEffect(() => {
        handleRedirect.setCheckDirect(e => {
            let data = { ...e }
            data.dashBoard = true;
            return data;
        })
    }, [])
    const store = useStore()

    const [totalSlidesMain, setTotalSlidesMain] = useState([]);
    const [totalSlidesPage, setTotalSlidesPage] = useState([]);

    const [numberSlideMain, setNumberSlideMain] = useState(1);
    const [checkChangeIs, setCheckChangeIs] = useState(true);
    const [checkChangeIsPage, setCheckChangeIsPage] = useState(true);
    //Slides main

    const [slidesMain, setSlidesMain] = useState([
        { url: '/static/media/banner2.b496451f.webp', id: 123 },
        { url: '/static/media/banner2.b496451f.webp', id: 124 },
        { url: '/static/media/banner2.b496451f.webp', id: 125 },
    ]);
    //end Slides main

    //banner main
    const [bannerMain, setBannerMain] = useState([]);
    const bannerMainRedux = useSelector(e => e.bannerMain.list);
    useEffect(() => {
        setBannerMain(bannerMainRedux);
    }, [])
    //end banner main

    //Slides page

    const [slidesPage, setSlidesPage] = useState([
        { url: '/static/media/banner2.b496451f.webp', id: 4435 },
        { url: '/static/media/banner2.b496451f.webp', id: 3456 },
    ]);
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


    const handleRemoveSlidesMain = (id) => {
        setCheckChangeIs(true);

        let arrSlidesMain = slidesMain;
        let arrNewSlidesMain = handleChangSlidesMain;
        let arrNewSlidesMainChange = dataChange;
        let resultSlidesMain = arrSlidesMain.filter(e => e.id !== id);
        let resultNewSlidesMain = arrNewSlidesMain.filter(e => e.id !== id);
        let resultNewSlidesMainChange = arrNewSlidesMainChange.filter(e => e.id !== id);

        setSlidesMain(resultSlidesMain);
        setHandleChangSlidesMain(resultNewSlidesMain);
        setDataChange(resultNewSlidesMainChange);
    }

    const handleRemoveSlidesPage = (id) => { //banner page
        setCheckChangeIsPage(true);

        let arrSlidesMain = slidesPage;
        let arrNewSlidesMain = handleChangSlidesPage;
        let arrNewSlidesMainChange = dataChangePage;
        let resultSlidesMain = arrSlidesMain.filter(e => e.id !== id);
        let resultNewSlidesMain = arrNewSlidesMain.filter(e => e.id !== id);
        let resultNewSlidesMainChange = arrNewSlidesMainChange.filter(e => e.id !== id);
        setSlidesPage(resultSlidesMain);
        setHandleChangSlidesPage(resultNewSlidesMain);
        setDataChangePage(resultNewSlidesMainChange);
    }

    let data = {
        setDataChange,
        setDataChangePage,
        numberSlideMain,
        dataChange,
        dataChangePage,
        setCheckChangeIs,
        setCheckChangeIsPage,
        bannerMain,
    }

    useEffect(() => {
        setTotalSlidesMain(slidesMain.concat(dataChange));
        setTotalSlidesPage(slidesPage.concat(dataChangePage));
    }, [slidesMain, slidesPage, dataChange, dataChangePage])

    const submitSlides = () => {
        const bannerMain = store.getState().bannerMain.list;
        console.log('submit', bannerMain, 'main', totalSlidesMain, 'page', totalSlidesPage);
    }

    return (
        <div className="container_user_dashboard slides">
            <div className="slides_main box_shadow">
                <h2>Slides main</h2>
                <ul>
                    {
                        slidesMain.map((e, i) => {
                            return (

                                <li key={i}>
                                    <ChangeFileImages url={e.url} section='slidesMain' data={data} />
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesMain(e.id)}>
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
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesMain(e?.id)}>
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
                                <ChangeFileImages url={e.url} section='slidesPage' data={data} />
                                <div className="remove_banner" onClick={() => handleRemoveSlidesPage(e?.id)}>
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
                                    <div className="remove_banner" onClick={() => handleRemoveSlidesPage(e?.id)}>
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