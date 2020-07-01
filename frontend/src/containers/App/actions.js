import { DEFAULT_ACTION, SETTINGS_ACTION, API_ERROR, WORKSPACES_ACTION, CURRENT_PROJECT_ACTION,  PROJECTS_ACTION } from './constants';

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

export function setWorkspaces(value) {
    return {
        type: WORKSPACES_ACTION,
        value,
    }
}

export function apiError(payload) {
    return {
        type: API_ERROR,
        payload,
    };
}

export function setProjects(value) {
    return {
        type: PROJECTS_ACTION,
        value,
    }
}

export function setCurrentProject(value) {
    return {
        type: CURRENT_PROJECT_ACTION,
        value,
    }
}