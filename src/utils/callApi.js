import axios from './../axios-main';
import { Cookies } from 'react-cookie';

export default function callApi(
    url,
    config,
) {
    return axios({ 
        method: config.method, 
        url, 
        headers: getToken(),
        data: config.data,
        params: config.params,
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}

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

export function setTokens(accessToken, client, uid) {
}