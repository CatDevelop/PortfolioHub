import React from "react";
import s from './SelectProjectCard.module.css';
import classNames from "classnames/bind";


export const SelectProjectCard = (props) => {
  return (
      <div className={classNames(s.projectCard, props.selectProjectID===props.id?s.select:"")} onClick={()=>props.setSelectProjectID(props.id)}>
        <div className={s.container}>
                <h3 className={s.projectCardHeader}>{props.title}</h3>
                <h6 className={s.projectCardDescription}>{props.description}</h6>
        </div>
      </div>
  )
}
