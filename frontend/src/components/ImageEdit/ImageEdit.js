import React from 'react';
import s from './ImageEdit.module.css';
import Form from 'react-bootstrap/Form';
import { saveAs } from 'file-saver';

function ImageEdit(props) {
    console.log(props.image)
    return (
        <div className={s.imageEdit}>
            {
                props.image && props.image !== "plumb.png" ?
                    <>
                        {
                            typeof props.image === 'string' ?  <a href={props.image} id="file-2" download>
                                    {/*<a href={props.resumeLink} id="file-2" download>*/}
                                    <div className={s.resumeDownload}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 10V16M12 16L9 13M12 16L15 13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Скачать изображение
                                    </div>
                                </a>:
                                <a onClick={() => saveAs(props.image[0])} id="file-2" download>
                                    {/*<a href={props.resumeLink} id="file-2" download>*/}
                                    <div className={s.resumeDownload}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 10V16M12 16L9 13M12 16L15 13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Скачать изображение
                                    </div>
                                </a>
                        }

                        <input type="file" name={"file-" + props.inputId + "[]"} id={"file-"+props.inputId} className={s.reinputFile}
                               data-multiple-caption="{count} files selected" multiple
                               {...props.register(props.registerName, props.options)}
                        />
                        <label htmlFor={"file-"+props.inputId}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33398 5.3335V12.0002H6.10934M26.5848 14.6668C25.9287 9.40508 21.4401 5.3335 16.0007 5.3335C11.5241 5.3335 7.69171 8.09106 6.10934 12.0002M6.10934 12.0002H12.0007M26.6673 26.6668V20.0002H25.892M25.892 20.0002C24.3096 23.9093 20.4772 26.6668 16.0007 26.6668C10.5612 26.6668 6.07264 22.5952 5.41651 17.3335M25.892 20.0002H20.0007" stroke="#81E6D9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                        <div className={s.deleteFile} onClick={() => props.setValue(props.registerName, '')}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.334 9.33333L24.1776 25.5233C24.0779 26.9188 22.9167 28 21.5177 28H10.4836C9.0846 28 7.92342 26.9188 7.82375 25.5233L6.66732 9.33333M13.334 14.6667V22.6667M18.6673 14.6667V22.6667M20.0007 9.33333V5.33333C20.0007 4.59695 19.4037 4 18.6673 4H13.334C12.5976 4 12.0007 4.59695 12.0007 5.33333V9.33333M5.33398 9.33333H26.6673" stroke="#81E6D9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </>

                    // <div className="box">
                    //     <a href={props.resumeLink} id="file-2" download>Download link
                    //     <label htmlFor="file-2">
                    //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //             <path d="M9 13H15M12 10L12 16M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    //         </svg>
                    //         <span>Добавить</span></label>
                    // </div>

                     :
                    <>
                        <div className="box">
                            <input type="file" name={"file-" + props.inputId + "[]"} id={"file-"+props.inputId} className={s.inputfile}
                                   data-multiple-caption="{count} files selected" multiple
                                   {...props.register(props.registerName, props.options)}
                            />
                            <label htmlFor={"file-"+props.inputId}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 13H15M12 10L12 16M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Добавить</span></label>
                        </div>
                    </>
            }

        </div>
    )
}

export default ImageEdit;
