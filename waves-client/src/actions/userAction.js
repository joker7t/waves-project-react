import { LOGIN, REGISTER, SET_USER_DETAILS } from "./type";

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