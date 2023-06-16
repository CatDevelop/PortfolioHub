import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer/Footer';
import MainContent from "./MainContent/MainContent";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from "react-toastify";

const PortfolioLayout = () => {
    return (
        <div>
            <NavBar type="port"/>
            <MainContent>
                <Outlet/>
            </MainContent>
            <Footer/>
        </div>
    );
};

export default PortfolioLayout;
