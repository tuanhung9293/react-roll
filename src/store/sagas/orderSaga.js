import * as types from '../actions/ActionTypes';
import { put, call } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from '../../axios-main';
import { Cookies } from 'react-cookie';

import * as actions from './../actions/orderAction';
import _ from 'lodash';

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

export function* getOrders(parameters) {
    try {
        yield put(showLoading());
        const response = yield call(actions.getOrders, parameters.options);
        if (response && !_.isUndefined(response.data)) {
            yield put({
                response: { ...response,
                    sortBy: parameters.options.sorted_by
                },
                type: types.GET_ORDERS_FILTERIC_SUCCESS,
            })
            return
        } else {
            yield put({
                data: {},
                type: types.GET_ORDERS_FILTERIC_ERROR
            })
        }
    } catch (error) {
        yield put({
            data: {},
            type: types.GET_ORDERS_FILTERIC_ERROR
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* createOrderSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({
            method: 'POST',
            url: '/orders.json',
            data: action.data,
            headers: getToken()
        });
        yield put({
            type: types.CREATE_ORDER_SUCCESS,
            data: response.data,
        })
        return response
    } catch (error) {
        yield put({
            type: types.CREATE_ORDER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* changeOrderStatus(parameters) {
    try {
        yield put(showLoading());
        const response = yield call(actions.changeOrderStatus, parameters.options);
        if (response && !_.isUndefined(response.data)) {
            yield put({
                type: types.CHANGE_ORDER_STATUS_SUCCESS,
                response
            })
        } else {
            yield put({
                type: types.CHANGE_ORDER_STATUS_ERROR,
                data: {}
            })
        }
    } catch (error) {
        yield put({
            type: types.CHANGE_ORDER_STATUS_ERROR,
            data: {}
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* updateOrderSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({
            method: 'PUT',
            url: `/orders/${action.id}.json`,
            data: action.data,
            headers: getToken()
        });
        yield put({
            type: types.UPDATE_ORDER_SUCCESS,
            response
        })
        return response
    } catch (error) {
        yield put({
            type: types.UPDATE_ORDER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* deleteOrderSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({
            method: 'DELETE',
            url: `/orders/${action.id}.json`,
            headers: action.headers
        });
        yield put({
            type: types.DELETE_ORDER_SUCCESS,
            data: {
                id: action.id,
            }
        })
        return response
    } catch (error) {
        yield put({
            type: types.DELETE_ORDER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* getAllCustomerSaga() {
    try {
        yield put(showLoading());
        const response = yield axios({
            method: 'GET',
            url: `/customers.json`,
            headers: getToken()
        });
        yield put({
            type: types.GET_ALL_CUSTOMER_SUCCESS,
            response
        })
    } catch (error) {
        yield put({
            type: types.GET_ALL_CUSTOMER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* payOrderTuanSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({
            method: 'PUT',
            url: `/orders/${action.id}/payOrder.json`,
            data: {
                payAmount: action.price
            },
            headers: getToken()
        });
        yield put({
            type: types.PAY_ORDER_SUCCESS,
            response
        })
        return response
    } catch (error) {
        yield put({
            type: types.PAY_ORDER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* payOrder(parameters) {
    try {
        yield put(showLoading());
        const orderPaymentResponse = yield call(actions.orderPayment, parameters.options);
        const editOrderResponse = yield call(actions.changeOrderStatus, _.assign(orderPaymentResponse.data.order, parameters.options));
        if (editOrderResponse && !_.isUndefined(editOrderResponse.data)) {
            parameters.callback();
            yield put({
                type: types.UPDATE_ORDER_SUCCESS,
                data: editOrderResponse.data.order,
                newindex: parameters.newindex ? parameters.newindex : 0,
            })
        } else {
            yield put({
                type: types.UPDATE_ORDER_ERROR,
                data: {}
            })
        }
    } catch (error) {
        yield put({
            type: types.UPDATE_ORDER_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* editOrder(parameters) {
    try {
        const response = yield call(actions.editOrder, parameters.options);
        if(response && !_.isUndefined(response.data)) {
            yield put({
                type: types.UPDATE_ORDER_SUCCESS,
                data: response.data.order,
                newindex: parameters.newindex ? parameters.newindex : 0,
            })
        } else {
            yield put({
                type: types.UPDATE_ORDER_ERROR,
                data: {}
            })
        }
    } catch(error) {
        yield put({
            type: types.UPDATE_ORDER_ERROR,
            error
        })
    }
}