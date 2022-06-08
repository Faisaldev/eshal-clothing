import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

//store persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middlewares));

//Store
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
