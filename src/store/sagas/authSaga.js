import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as types from '../actions/ActionTypes';
import { put } from 'redux-saga/effects'
import axios from '../../axios-main';

export function* userLoginSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({ method: 'POST', url:'/auth/sign_in', data: action.data});
        yield put({
            type: types.USER_LOGIN_SUCCESS,
            response
        })
        yield action.history.push('/dashboard')
        return response
    } catch (error) {
        yield put({
            type: types.USER_LOGIN_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}

export function* userLogoutSaga(action) {
    try {
        yield put(showLoading());
        const response = yield axios({ method: 'DELETE', url:'/auth/sign_out', headers: action.headers})
        yield put({
            type: types.USER_LOGOUT_SUCCESS,
            response
        })
        return response
    } catch (error) {
        yield put({
            type: types.USER_LOGOUT_ERROR,
            error
        })
    } finally {
        yield put(hideLoading());
    }
}
