import { useStore } from "react-redux";
import { useEffect, useState } from "react";

export default function ViewBox({ viewBox, dataHandle, dataUserCurrent }) {

    return (
        <div className={`box_view_order  ${viewBox.view ? `` : `d-none`}`}>
            <div className={`container_view_order`}>
                <h2>Info User Buy: id Order {viewBox.idOrder}</h2>
                <ul>
                    <li>
                        <h3>username</h3>
                        <p>{dataUserCurrent.username}</p>
                    </li>
                    <li>
                        <h3>role</h3>
                        <p>{dataUserCurrent.role}</p>
                    </li>
                    <li>
                        <h3>fullname</h3>
                        <p>{dataUserCurrent.fullname}</p>
                    </li>
                    <li>
                        <h3>avatar</h3>
                        <img src={dataUserCurrent.avatar} alt="" />
                    </li>
                    <li>
                        <h3>address</h3>
                        <p>{dataUserCurrent.address}</p>
                    </li>
                    <li>
                        <h3>email</h3>
                        <p>{dataUserCurrent.email}</p>
                    </li>
                    <li>
                        <h3>phone</h3>
                        <p>{dataUserCurrent.phone}</p>
                    </li>

                </ul>
                <button className="close_box_order" onClick={() => dataHandle.setViewBox(e => {
                    let data = { ...e };
                    data.view = false;
                    return data;
                })}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    );
}