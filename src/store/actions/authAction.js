import * as types from './ActionTypes';
import { Cookies } from 'react-cookie';

let getToken = () => {
    const cookies = new Cookies();
    let auth = cookies.get('authState').token || {};
    let headers = {
        "Uid": auth['uid'],
        "Access-token": auth['access-token'],
        "Client": auth['client']
    }
    return headers;
}

export const userLogin = (data, history) => {
    return {
      type: types.USER_LOGIN,
      data: data,
      history: history
    };
};

export const userLogout = () => {
    return {
      type: types.USER_LOGOUT,
      headers: getToken(),
    };
};
