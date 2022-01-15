import React from "react";
import './client.scss';

const Client:React.FC = () => {
    return(
        <div className="App container">
            <div className="row-container">
                <div className="col">
                    <button className="btn orange">-</button>
                </div>
                <div className="col">
                    <button className="btn blue">+</button>
                </div>
            </div>
        </div>
    )
}

export default Client;