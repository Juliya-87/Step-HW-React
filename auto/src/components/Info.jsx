import React from 'react'
import "./Info.css";
import infoImg from "../components/images/info.png";

function Info() {
    return (
        <>
            <section className="info">
                <h1>Блок Info</h1>
                <p>Подробиці про Info</p>
                <img className="info-image" src={infoImg} alt="Information" />
            </section>
        </>
    )
}

export default Info
