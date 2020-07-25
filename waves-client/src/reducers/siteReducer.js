import { SET_SITE_INFO } from "../actions/type";

const initialState = {
    data: {
        address: "",
        phone: "",
        workingHour: "",
        email: ""
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SITE_INFO:
            return {
                ...state,
                data: action.payload
            };

        default:
            return state;
    }
}