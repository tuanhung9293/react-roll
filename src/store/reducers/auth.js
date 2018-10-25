import { Cookies } from 'react-cookie';
import {
    // USER_LOGIN,
    USER_LOGIN_SUCCESS,
    // USER_LOGIN_ERROR,
    USER_LOGOUT,
    // USER_LOGOUT_SUCCESS,
    // USER_LOGOUT_ERROR,
} from '../actions/ActionTypes';

const cookies = new Cookies();
let initialState = cookies.get('authState') || {};

export default function auth(state = initialState, action) {
    let authState = state;

    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            authState = {
                ...state,
                token: action.response.headers,
                user: action.response.data.data,
            };
            break;
        case USER_LOGOUT:
            authState = {
            };
            break;
        default:
            authState = state;
    }
    cookies.set('authState', authState, { path: '/' });
    return authState;
};
