import React from 'react';
import s from './MainContent.module.css';

function MainContent ({children}) {
    return (
        <div className={s.app}>
            {children}
        </div>
    )
}

export default MainContent;