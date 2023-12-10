import {ACCESS_TOKEN} from "../constans";
import {Navigate} from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;