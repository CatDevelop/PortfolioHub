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

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default PortfolioLayout;
