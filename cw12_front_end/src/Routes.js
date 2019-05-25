import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./containers/Main";
import MyPhotos from "./containers/MyPhotos";
import AddPhoto from "./containers/AddPhoto";
import Register from "./containers/Register";
import Login from "./containers/Login";
import UserPhotos from "./components/UserPhotos";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
};

const Routes = ({user}) => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact component={Main} />
                <ProtectedRoute
                    isAllowed={user}
                    path="/add_photo"
                    exact
                    component={AddPhoto}
                />
                <Route path="/my_photos" exact component={MyPhotos} />
                <Route path="/user_photos/:id" exact component={UserPhotos} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Fragment>
    );
};

export default Routes;