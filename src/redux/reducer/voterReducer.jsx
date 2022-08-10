import { ActionTypes } from "../contants/action-types"
const initList = {
    voters: null,
    pg: {
        size: null,
        pages: null,
        current: null,
        total: null
    }
}

// const initList = [];


export const voterListReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.VOTER_LIST:
            return { ...state, ...payload };
        default:
            return state;
    }
}

export const voterDetailReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.VOTER_DETAIL:
            return { ...payload };
        default:
            return state;
    }
}