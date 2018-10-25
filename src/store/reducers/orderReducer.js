import {
    GET_ORDERS_FILTERIC_SUCCESS,
    CHANGE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_SUCCESS,
    GET_ALL_CUSTOMER_SUCCESS,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS
} from '../actions/ActionTypes';
import _ from 'lodash';

let initialState = {};

export default function order(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_FILTERIC_SUCCESS:
            return {
                ...state,
                ordersFilteric: action.response.data.orders,
                total: action.response.data.total,
                ordersSortBy: action.response.sortBy,
            };
        case CHANGE_ORDER_STATUS_SUCCESS: {
            return {
                ...state,
                ordersFilteric: state.ordersFilteric.map((order) => {
                    if (order.id === action.response.data.order.id) {
                        return action.response.data.order
                    }
                    return order
                })
            };
        }

        case CREATE_ORDER_SUCCESS: {
            let orders = _.clone(state.ordersFilteric);
            orders.push(action.data.order);
            return {
                ...state,
                ordersFilteric: orders
            };
        }

        case UPDATE_ORDER_SUCCESS: {
            let newindex = action.newindex ? action.newindex : 0;
            let sameStatusOrders = _.filter(state.ordersFilteric, order => {
                return order.status === action.data.status && order.id !== action.data.id;
            })
            let otherOrders = _.filter(state.ordersFilteric, order => {
                return order.status !== action.data.status && order.id !== action.data.id;
            })
            let selectedOrder = _.find(state.ordersFilteric, order => {
                return order.id === action.data.id
            })
            sameStatusOrders.splice(newindex, 0, _.assign({}, selectedOrder, action.data))
            return {
                ...state,
                ordersFilteric: _.concat(sameStatusOrders, otherOrders)
            };
        }
        case DELETE_ORDER_SUCCESS: {
            return {
                ...state,
                ordersFilteric: _.filter(state.ordersFilteric, order => {
                    return order.id !== action.data.id;
                })
            };
        }
        case GET_ALL_CUSTOMER_SUCCESS:
            return {
                ...state,
                allCustomer: action.response.data.customers
            };

        default:
            {
                break;
            }
    }

    return state;
};
