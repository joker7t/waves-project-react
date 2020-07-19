import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_BRANDS, GET_WOODS, GET_SHOP, ADD_PRODUCT, ADD_BRAND, ADD_WOOD } from "../actions/type";

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
        case GET_SHOP:
            return {
                ...state,
                products: action.payload
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case ADD_BRAND:
            return {
                ...state,
                brands: [...state.brands, action.payload]
            };
        case ADD_WOOD:
            return {
                ...state,
                woods: [...state.woods, action.payload]
            };

        default:
            return state;
    }
}