import React from "react";
import './styles.css'
import { useNavigate } from 'react-router-dom';

const Header = ({ title = "Página sem título" }) => {

    const navigate = useNavigate();
    return (
        <div onClick={() => title === 'TEAMS' ? navigate('/') : navigate('/teams')} className="row content">
            <div className="col text-center">
                <hr className="line" />
                <h2 className="title">{title}</h2>
            </div>
        </div>
    );
};

export default Header;