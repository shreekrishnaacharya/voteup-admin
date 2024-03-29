import { ActionTypes } from "../contants/action-types"
const initList = {};

export const dboardReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.DASHBOARD:
            return { ...state, ...payload };
        default:
            return state;
    }
}
