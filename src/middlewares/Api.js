import axios from 'axios';
// import * as Actions from '../store/actions';
import { API_URL } from '../constants/Api';

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      transformResponse: [function (data) {
        return typeof data !== 'object' ? JSON.parse(data) : data;
      }]
    })
  },
};

