import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
    let composeEnhancers = compose;

    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    const middlewares = [routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );
    const persistor = persistStore(store);

    // Extensions
    store.injectedReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return { store, persistor };
}