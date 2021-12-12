import React from "react";
import './styles.css'

const Header = ({ title = "Página sem título" }) => {


    return (
        <div className="row content">
        <div className="col text-center">
            <hr className="line"/>
        <h2 className="title">{title}</h2>
        </div>
        </div>
    );
};

export default Header;