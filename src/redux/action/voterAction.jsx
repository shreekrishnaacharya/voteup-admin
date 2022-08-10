import { ActionTypes } from "../contants/action-types"

const setVoterList = (voterList) => {
    return {
        type: ActionTypes.VOTER_LIST,
        payload: voterList
    }
};


const setVoterDetail = (voter) => {
    return {
        type: ActionTypes.VOTER_DETAIL,
        payload: voter
    }
};
export { setVoterList, setVoterDetail }
