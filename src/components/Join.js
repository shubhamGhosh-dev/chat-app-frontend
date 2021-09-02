import React, { useState } from "react";
import { nanoid } from 'nanoid'


const Jion = ({ setUser }) => {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const phoneNumber = nanoid(12);

        if(name){
            setUser({ name, phoneNumber });
        } 
        
    };

    return (
        <div className="jion-container">
            <div className="join">
                <img src="img/logo.png" alt="LOGO" className="join-logo"></img>
                <span></span>
                <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" className="join-form">
                    <input
                        className="name-input"
                        type="text"
                        placeholder="Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        value={name}
                        required
                        autoComplete="off"
                        name="name"
                        />

                    <input className="join-submit" type="submit" value="Join" />
                </form>
                <p>By Shubham Ghosh</p>
            </div>
        </div>
    );
};

export default Jion;
