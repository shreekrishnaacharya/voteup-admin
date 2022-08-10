import { ActionTypes } from "../contants/action-types"
const initList = {
    "email": null,
    "name": null,
    "mystory": null,
    "img": "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "coverImg": "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc",
    "sex": null,
    "contact": null,
    "address1": null,
    "address2": null,
    "state": null,
    "country": null
}

export const profileReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.PROFILE:
            return { ...state, ...payload };
        default:
            return state;
    }
}
