import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

export default combineReducers({
    auth: userReducer,
    product: productReducer
});