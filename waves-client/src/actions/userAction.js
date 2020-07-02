import { LOGIN, REGISTER } from "./type";

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