import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer/Footer';
import MainContent from "./MainContent/MainContent";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import WidthContent from "./WidthContent/WidthContent";

const ProfileLayout = () => {
    return (
        <div>
            <NavBar type="port"/>
            <WidthContent>
                <Outlet/>
            </WidthContent>
            <Footer/>
        </div>
    );
};

export default ProfileLayout;
