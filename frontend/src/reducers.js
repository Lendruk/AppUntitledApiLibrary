import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';
import loginReducer from './containers/Login/reducer';
import {
    generalReducer,
    languageReducer,
    settingsReducer,
} from './containers/App/reducer';

import history from './utils/history';

export default function createReducer(injectedReducers = {}) {
    const persistConfig = {
        key: 'scrumer-root',
        storage,
        blacklist: ['router'],
    };

    const rootReducer = persistCombineReducers(persistConfig, {
        router: connectRouter(history),
        general: generalReducer,
        language: languageReducer,
        login: loginReducer,
        settings: settingsReducer,
        ...injectedReducers,
    });

    return rootReducer;
}