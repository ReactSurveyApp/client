import React from 'react';
import {Link} from "react-router-dom";


function UserSelect() {
    return (
        <div className="flex flex-col items-center mr-auto ml-auto justify-center">
            <Link
                className={"bg-red-400 text-white p-2 rounded-lg mt-10"}
                to="/admin-panel"
            >
                ADMİN PANELE GİT
            </Link>
            <Link
                className={"bg-blue-400 text-white p-2 rounded-lg mt-5"}
                to="/user-panel"
            >
                USER PANELE GİT
            </Link>
            <Link
                className={"bg-green-400 text-white p-2 rounded-lg mt-5"}
                to={"/add-admin"}
            >
                ADMİN EKLE
            </Link>
            <Link
                className={"bg-red-400 text-white p-2 rounded-lg mt-5"}
                to={"/admin-login"}
            >
                ADMİN LOGIN
            </Link>
            <Link
                className={"bg-blue-400 text-white p-2 rounded-lg mt-5"}
                to="/anket-listele"
            >
                ANKETLER
            </Link>
            <Link
                className={"bg-blue-400 text-white p-2 rounded-lg mt-5"}
                to="/anket-detay"
            >
                ANKET DETAY
            </Link>
        </div>
    );
}

export default UserSelect;