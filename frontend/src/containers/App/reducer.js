import produce from 'immer';
import { DEFAULT_ACTION, SETTINGS_ACTION, WORKSPACES_ACTION } from './constants';

export const initialState = {};
export const languageInitialState = { locale: 'en' };

export const generalReducer = (state = initialState, action) =>
    produce(state, (/* draft */) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            default:
                break;
        }
    });

export const workspaceReducer = (state = initialState, action) => 
    produce(state, (/* draft */) => {
        switch (action.type) {
            case WORKSPACES_ACTION:
                return action.value;
            default:
                break;
        }
});

export const languageReducer = (state = languageInitialState, action) =>
    produce(state, (/* draft */) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            default:
                break;
        }
    });

export const settingsReducer = (state = initialState, action) =>
    produce(state, (/* draft */) => {
        switch (action.type) {
            case SETTINGS_ACTION:
                return action.value;
            default:
                break;
        }
    });