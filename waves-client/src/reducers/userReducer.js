import { LOGIN, REGISTER, SET_USER_DETAILS } from "../actions/type";

const initialState = {
    user: null,
    userDetails: {
        carts: [],
        histories: [],
        email: '',
        name: '',
        lastname: ''
    }
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
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload
            };

        default:
            return state;
    }
}