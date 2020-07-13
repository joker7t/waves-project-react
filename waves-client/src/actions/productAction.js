import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL } from "./type";

export const getProductBySell = products => dispatch => {
    dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: products
    });
};

export const getProductByArrival = products => dispatch => {
    dispatch({
        type: GET_PRODUCTS_BY_SELL,
        payload: products
    });
};