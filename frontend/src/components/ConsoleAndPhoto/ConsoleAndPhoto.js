import React, {useEffect, useState} from 'react';
import s from './ConsoleAndPhoto.module.css';
import Console from "./Console";
import avatar from "../../assets/img/Avatar.png";

function ConsoleAndPhoto(props) {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    let toRotate = props.toRotate.length !== 0 ? props.toRotate : [" "];
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker)
        };
    }, [text])

   let tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <div className={s.ConsoleAndPhoto}>
            <div className={s.Console}>
                <Console text={text}/>
            </div>
            <div className={s.Avatar}>
                <img src={avatar} alt="Header Img"/>
            </div>
        </div>
    )
}

export default ConsoleAndPhoto;