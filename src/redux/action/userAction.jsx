import { ActionTypes } from "../contants/action-types"

export const setLogin = (user) => {
    user = {
        ...user,
        isLogin: true
    };
    window.localStorage.setItem("userAdminModel", JSON.stringify(user));
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
};

export const updateUser = (user) => {
    window.localStorage.setItem("userAdminModel", JSON.stringify(user));
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
};
// window.localStorage.removeItem("userAdminModel");
export const setLogout = () => {
    window.localStorage.removeItem("userAdminModel");
    return {
        type: ActionTypes.LOGOUT,
        payload: {}
    }
};
