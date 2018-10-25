import * as types from '../actions/ActionTypes';
import {
    takeLatest,
    all
} from 'redux-saga/effects'
import {
    userLoginSaga,
    userLogoutSaga,
} from './authSaga';
import * as customerSaga from './customerSaga';
import {
    getOrders,
    createOrderSaga,
    changeOrderStatus,
    updateOrderSaga,
    deleteOrderSaga,
    getAllCustomerSaga,
    payOrderTuanSaga,
    payOrder,
    editOrder
} from './orderSaga';

export function* watchAuth() {
    yield all([
        takeLatest(types.USER_LOGIN, userLoginSaga),
        takeLatest(types.USER_LOGOUT, userLogoutSaga),

        takeLatest(types.GET_ALL_CUSTOMERS, customerSaga.getAllCustomers),
        takeLatest(types.LOAD_CUSTOMER_LIST, customerSaga.loadCustomerList),
        takeLatest(types.LOAD_CUSTOMER_GROUP, customerSaga.loadCustomerGroup),
        takeLatest(types.ADD_CUSTOMER, customerSaga.addCustomer),
        takeLatest(types.EDIT_CUSTOMER, customerSaga.editCustomer),
        takeLatest(types.DELETE_CUSTOMER, customerSaga.deleteCustomer),

        takeLatest(types.GET_ORDERS_FILTERIC, getOrders),
        takeLatest(types.CREATE_ORDER, createOrderSaga),
        takeLatest(types.UPDATE_ORDER, updateOrderSaga),
        takeLatest(types.DELETE_ORDER, deleteOrderSaga),
        takeLatest(types.GET_ALL_CUSTOMER, getAllCustomerSaga),
        takeLatest(types.PAY_ORDER, payOrderTuanSaga),
        
        takeLatest(types.CHANGE_ORDER_STATUS, changeOrderStatus),
        takeLatest(types.EDIT_ORDER, editOrder),
        takeLatest(types.ORDER_PAYMENT, payOrder),
    ])
}
