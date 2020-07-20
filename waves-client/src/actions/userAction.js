import { LOGIN, REGISTER, SET_USER_DETAILS, ADD_TO_CART_USER } from "./type";

export const login = user => dispatch => {
    dispatch({
        type: LOGIN,
        payload: user
    });
};

export const register = user => dispatch => {
    dispatch({
        type: REGISTER,
        payload: user
    });
};

export const setUserDetails = userDetails => dispatch => {
    dispatch({
        type: SET_USER_DETAILS,
        payload: userDetails
    });
};

export const addToCart = cart => dispatch => {
    dispatch({
        type: ADD_TO_CART_USER,
        payload: cart
    });
};