import { ActionTypes } from "../contants/action-types"

export const setProfile = (user) => {
    return {
        type: ActionTypes.PROFILE,
        payload: user
    }
};

