import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_WOODS, GET_BRANDS, GET_SHOP } from "./type";

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

export const getBrands = brands => dispatch => {
    dispatch({
        type: GET_BRANDS,
        payload: brands
    });
};

export const getWoods = woods => dispatch => {
    dispatch({
        type: GET_WOODS,
        payload: woods
    });
};

export const getShop = shopProducts => dispatch => {
    dispatch({
        type: GET_SHOP,
        payload: shopProducts
    });
};