import React from 'react';
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { pages, guestPage } from "links/pages";
import TokenService from '_services/token.service';

const Auth = ({ children }) => {
    const userModel = TokenService.getUser();
    const location = useLocation();
    const history = useHistory();
    function checkLogin() {
        if (userModel && userModel.isLogin) {
            if (guestPage.includes(location.pathname)) {
                history.push(pages.HOME);
                return true;
            }
        } else {
            if (!guestPage.includes(location.pathname)) {
                history.push(pages.LOGIN);
                return false;
            }
        }
        return (
            <div key="AuthController">
                {children}
            </div>
        );
    }
    console.log("I am auth");
    // return (
    //     <div key="AuthController">
    //         {children}
    //     </div>
    // );
    return checkLogin();
}

export default Auth;