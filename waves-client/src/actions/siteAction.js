import { SET_SITE_INFO } from "./type";

export const setSiteInfo = siteInfo => dispatch => {
    dispatch({
        type: SET_SITE_INFO,
        payload: siteInfo
    });
};