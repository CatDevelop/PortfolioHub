import React from 'react';
import s from './InfoBlock.module.css';

function InfoBlock(props) {
    return (
        <div className={s.infoBlock}>
            <h3 className={s.header}>
                {props.header}
            </h3>
            <p className={s.content}>
                {props.content}
            </p>
        </div>
    )
}

export default InfoBlock;