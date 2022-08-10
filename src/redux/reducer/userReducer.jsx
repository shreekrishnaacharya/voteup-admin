import { ActionTypes } from "../contants/action-types"
let initialState = {
    _id: null,
    name: "",
    isLogin: false,
    token: "",
    refreshToken: ""
}

const userModel = localStorage.getItem('userModel');
// localStorage.removeItem('userModel')
if (userModel) {
    initialState = JSON.parse(userModel);
}
window.store_access_token = initialState.token;
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.LOGIN:
            window.store_access_token = payload.token;
            return { ...state, ...payload };
        case ActionTypes.LOGOUT:
            return {};
        default:
            return state;
    }
}
