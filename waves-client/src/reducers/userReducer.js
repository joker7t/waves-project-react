import { LOGIN, REGISTER } from "../actions/type";

const initialState = {
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case REGISTER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}