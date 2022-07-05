import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
export default function Banner({ dataBanner, thisPage = '' }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        className: 'left_content_banner',
        // slide: "ul"
    };

    return (
        <>
            <Slider {...settings}>
                {
                    dataBanner.map((e, i) => {
                        return (
                            thisPage == 'Product' ?
                                <img className="bg items_slides" key={i} src={e?.thumb} alt="" />
                                : <Link to={`/${e.link}`} key={i}>
                                    <img className="bg items_slides" src={e.thumb} alt="" />
                                </Link>
                        );
                    })
                }
            </Slider>


        </>
    );
}