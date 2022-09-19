import { setLogout } from "redux/action/userAction";
class TokenService {
    static store;
    static setStore(store) {
        this.store = store;
    }
    static interval;
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("userAdminModel"));
        return user?.refreshToken;
    }
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("userAdminModel"));
        return user?.token;
    }
    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("userAdminModel"));
        user.token = token;
        localStorage.setItem("userAdminModel", JSON.stringify(user));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("userAdminModel"));
    }
    setUser(user) {
        user["isLogin"] = true;
        localStorage.setItem("userAdminModel", JSON.stringify(user));
    }
    removeUser() {
        this.store.dispatch(setLogout());
    }
}
export default new TokenService();
