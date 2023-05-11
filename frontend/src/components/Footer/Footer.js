import React from 'react';
import s from './Footer.module.css';

function Footer () {
    return (
        <footer className={s.footer}>
            <p className={s.foot}>
                © 2023 CatDeveloper. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer;