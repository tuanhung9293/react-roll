import * as types from './ActionTypes';
import { Cookies } from 'react-cookie';
import callApi from './../../utils/callApi';

const GET_ORDERS_URL = "orders-filteric.json";
const PAY_ORDER_URL = "payOrder.json";

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

export const createOrder = (data) => {
    return {
      type: types.CREATE_ORDER,
      data: data,
      headers: getToken(),
    };
};

export const getOrdersFilteric = (pagination) => {
    return {
      type: types.GET_ORDERS_FILTERIC,
      data: pagination,
      headers: getToken(),
    };
};

export const changeOrderStatus = (data) => {
    return {
      type: types.CHANGE_ORDER_STATUS,
      data: data,
      headers: getToken(),
    };
};

export const payOrder = (id, price) => {
    return {
      type: types.PAY_ORDER,
      id: id,
      price: price,
      headers: getToken(),
    };
};

export const getOrders = (data) => {
    const config = {
        method: 'POST',
        data
    }
    return callApi(GET_ORDERS_URL, config);
};

export const orderPayment = (data) => {
    const config = {
        method: 'PUT',
        data: {
            payAmount: data.amount
        }
    }
    return callApi(`orders/${data.id}/${PAY_ORDER_URL}`, config);
}

export const editOrder = (data) => {
    const config = {
        method: 'PUT',
        data,
    }
    return callApi(`orders/${data.id}/${data.status}.json`, config);
}

export const deleteOrder = (id) => {
    return {
      type: types.DELETE_ORDER,
      id: id,
      headers: getToken(),
    };
};

export const updateOrder = (id, data) => {
    return {
      type: types.UPDATE_ORDER,
      id: id,
      data: data,
    };
};

export const getAllCustomer = () => {
    return {
        type: types.GET_ALL_CUSTOMER,
    };
}

export const payOrderTuan = (id, price) => {
    return {
      type: types.PAY_ORDER,
      id: id,
      price: price,
    };
};