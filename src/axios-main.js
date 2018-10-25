import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://roll-novahub.herokuapp.com/api/'
});

export default instance;