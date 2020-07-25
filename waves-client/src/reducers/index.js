import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import siteReducer from "./siteReducer";

export default combineReducers({
    auth: userReducer,
    product: productReducer,
    site: siteReducer
});