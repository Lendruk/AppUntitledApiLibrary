import { DEFAULT_ACTION, SETTINGS_ACTION, API_ERROR } from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function setSettings(value) {
    return {
        type: SETTINGS_ACTION,
        value,
    };
}

export function apiError(payload) {
    return {
        type: API_ERROR,
        payload,
    };
}