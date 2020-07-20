import { LOGIN, REGISTER, SET_USER_DETAILS, ADD_TO_CART_USER } from "../actions/type";

const initialState = {
    user: null,
    userDetails: null
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
        case ADD_TO_CART_USER:
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    carts: action.payload
                }
            };

        default:
            return state;
    }
}