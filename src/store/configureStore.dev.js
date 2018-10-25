import { createStore, applyMiddleware, compose } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'localforage';
import { apiClients } from '../middlewares/Api';
import rootReducer from './reducers';

import { createLogger } from 'redux-logger';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga'
import { watchAuth } from './sagas'
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
	storage: storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
	const store = createStore(
		persistedReducer,
		compose(
			applyMiddleware(
                sagaMiddleware,
				multiClientMiddleware(apiClients),
				createLogger()
			),
			DevTools.instrument()
		)
	);
    const persistor = persistStore(store);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default;
			store.replaceReducer(nextRootReducer);
		})
    }
    
    sagaMiddleware.run(watchAuth);

	return { persistor, store };
}

export default configureStore;
