import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_BRANDS, GET_WOODS } from "../actions/type";

const initialState = {
    products: [],
    bySell: [],
    byArrival: [],
    brands: [],
    woods: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_ARRIVAL:
            return {
                ...state,
                byArrival: action.payload
            };
        case GET_PRODUCTS_BY_SELL:
            return {
                ...state,
                bySell: action.payload
            };
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            };
        case GET_WOODS:
            return {
                ...state,
                woods: action.payload
            };

        default:
            return state;
    }
}