import { put, call } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as types from './../actions/ActionTypes';
import * as actions from './../actions/customerActions';
import _ from 'lodash';

export function* getAllCustomers() {
    try {
        yield put(showLoading());
        const customer = yield call(actions.getAllCustomers);
        if (customer && !_.isUndefined(customer.data)) {
            yield put({
                data: customer.data,
                type: types.LOAD_CUSTOMER_SUCCESS,
            })
            return
        } else {
            yield put({
                data: {},
                type: types.LOAD_CUSTOMER_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.LOAD_CUSTOMER_FAIL
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* loadCustomerList(parameters) {
    try {
        yield put(showLoading());
        const customer = yield call(actions.loadCustomers, parameters.options);
        if (customer && !_.isUndefined(customer.data)) {
            yield put({
                data: customer.data,
                type: types.LOAD_CUSTOMER_SUCCESS,
            })
            return
        } else {
            yield put({
                data: {},
                type: types.LOAD_CUSTOMER_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.LOAD_CUSTOMER_FAIL
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* loadCustomerGroup() {
    try {
        yield put(showLoading());
        const response = yield call(actions.loadCustomerGroup);
        if (response && !_.isUndefined(response.data)) {
            yield put({
                data: response.data,
                type: types.LOAD_CUSTOMER_GROUP_SUCCESS,
            })
            return
        } else {
            yield put({
                data: {},
                type: types.LOAD_CUSTOMER_GROUP_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.LOAD_CUSTOMER_GROUP_SUCCESS
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* addCustomer(parameters) {
    try {
        yield put(showLoading());
        const response = yield call(actions.addCustomer, parameters.options);
        if (response) {
            parameters.callback();
        } else {
            yield put({
                data: {},
                type: types.ADD_CUSTOMER_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.ADD_CUSTOMER_FAIL
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* editCustomer(parameters) {
    try {
        yield put(showLoading());
        const response = yield call(actions.editCustomer, parameters.options);
        if (response) {
            parameters.callback();
        } else {
            yield put({
                data: {},
                type: types.EDIT_CUSTOMER_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.EDIT_CUSTOMER_FAIL
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* deleteCustomer(parameters) {
    try {
        yield put(showLoading());
        const response = yield call(actions.deleteCustomer, parameters.options);
        if (response) {
            parameters.callback();
        } else {
            yield put({
                data: {},
                type: types.DELETE_CUSTOMER_FAIL
            })
        }
    } catch(error) {
        yield put({
            data: {},
            type: types.DELETE_CUSTOMER_FAIL
        })
    } finally {
        yield put(hideLoading());
    }
}