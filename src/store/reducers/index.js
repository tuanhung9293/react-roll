import auth from './auth';
import order from './orderReducer';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import customers from './customerReducer';

const appReducer = combineReducers({
    auth,
    order,
    form: formReducer,
    loadingBar: loadingBarReducer,
    routing: routerReducer,
    customerData: customers,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
