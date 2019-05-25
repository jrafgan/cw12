import React from 'react';
import FacebookLogin from "./FacebookLogin";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => (
    <div className="anonymous_menu">
        <div>
            <NavLink to="/register" exact>Register</NavLink>
        </div>
        <div>
            <FacebookLogin/>
        </div>
        <div>
            <NavLink to="/login" exact>Login</NavLink>
        </div>
    </div>
);

export default AnonymousMenu;