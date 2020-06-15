/*
 *
 * Login reducer
 *
 */
import {
    LOGIN_SUCCESS,
    LOGOUT,
    USER_UPDATE,
} from './constants';

export const initialState = {
    user: null,
    token: localStorage.getItem("token") || "",
};

export default function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case USER_UPDATE: {
            const { user } = action.payload;
            return { ...state, user };
        }
        case LOGIN_SUCCESS: {
            const { token, user } = action.payload;
            localStorage.setItem("token", token);
            return { token, user };
        }
        case LOGOUT:
            localStorage.setItem("token", "");
            return { token: "", user: null };
        default:
            return state;
    }
}
