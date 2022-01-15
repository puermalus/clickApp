import React from "react";
import './client.scss';
import { submitClick } from "../api/client";

const Client: React.FC = () => {

    const handeClick: any = async (color) => {
        let data = { color: color };
        await submitClick(data);
    }
    return (
        <div className="App container">
            <div className="row-container">
                <div className="col">
                    <button className="btn orange" onClick={() => handeClick('orange')}>-</button>
                </div>
                <div className="col">
                    <button className="btn blue" onClick={() => handeClick('blue')}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Client;