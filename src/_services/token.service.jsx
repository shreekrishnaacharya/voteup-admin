import { setLogout } from "redux/action/userAction";
class TokenService {
    static store;
    static setStore(store) {
        this.store = store;
    }
    static interval;
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("userModel"));
        return user?.refreshToken;
    }
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("userModel"));
        return user?.token;
    }
    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("userModel"));
        user.token = token;
        localStorage.setItem("userModel", JSON.stringify(user));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("userModel"));
    }
    setUser(user) {
        user["isLogin"] = true;
        localStorage.setItem("userModel", JSON.stringify(user));
    }
    removeUser() {
        this.store.dispatch(setLogout());
    }
}
export default new TokenService();
