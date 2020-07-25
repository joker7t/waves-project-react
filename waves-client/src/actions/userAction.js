import { LOGIN, REGISTER, SET_USER_DETAILS, ADD_TO_CART_USER, REMOVE_FROM_CART_USER, CLEAR_CART_USER } from "./type";

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

export const addToCart = newCarts => dispatch => {
    dispatch({
        type: ADD_TO_CART_USER,
        payload: newCarts
    });
};

export const removeFromCart = removedCart => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART_USER,
        payload: removedCart
    });
};

export const clearCart = () => dispatch => {
    dispatch({
        type: CLEAR_CART_USER,
        payload: []
    });
};