import * as types from '../actions/ActionTypes';
import _ from 'lodash';

let initialState = {
	customers: [],
	total: 0,
	groups: [],
};

export default function customerReducer(state = initialState, action) {
	switch (action.type) {
        case types.LOAD_CUSTOMER_SUCCESS: {
			return _.assign({}, state, action.data);
		}
		case types.LOAD_CUSTOMER_GROUP_SUCCESS: {
			return _.assign({}, state, action.data);
		}
		default:
			return state;
	}
};