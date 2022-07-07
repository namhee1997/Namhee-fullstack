import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
export default function BannerLogo({ dataBanner }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        className: 'logo_content_banner',
    };

    return (
        <>
            <Slider {...settings}>
                {
                    dataBanner.map((e, i) => {
                        return (
                            <label htmlFor={e.url} key={i}>
                                <img className="bg items_slides" src={e.src} alt="" />
                            </label >
                        );
                    })
                }
            </Slider>


        </>
    );
}