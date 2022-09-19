import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { profileReducer } from "./profileReducer";
import { menuReducer } from "./menuReducer";
import { voterListReducer } from "./voterReducer";
// import { vendDetailReducer, vendListReducer } from "./vendReducer";
// import { contactDetailReducer, contactListReducer } from "./contactReducer";
// import { navPathReducer } from "./navPathReducer";
import { alertReducer } from "./alertReducer";
import { dboardReducer } from "./dboardReducer";

const reducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    menu: menuReducer,
    // voterDetail: voterDetailReducer,
    voterList: voterListReducer,
    // vendList: vendListReducer,
    // contactList: contactListReducer,
    // contactDetail: contactDetailReducer,
    // navPath: navPathReducer,
    alert: alertReducer,
    dboard: dboardReducer
});

export default reducers;