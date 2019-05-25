import React from 'react';
import {NavLink} from "react-router-dom";
import ImageThumbnail from "./ImageThumbnail";

const UserMenu = ({user, logout}) => {

    return (
        <div className="user_menu">
            <div className="user_info">
                Hello, <NavLink to="/my_photos" exact>{user.name}</NavLink>!
                <ImageThumbnail image={user.image} class="small_img_thumbnail" facebookId={user.facebookId}/>
            </div>
            <NavLink to="/my_photos" exact>My photos</NavLink>
            <NavLink to="/add_photo" exact>Add photo</NavLink>
            <NavLink onClick={logout} to="/" exact>Logout</NavLink>
        </div>)
};

export default UserMenu;