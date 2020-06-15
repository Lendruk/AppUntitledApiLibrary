/*
 *
 * Login actions
 *
 */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATE,
} from './constants';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}
export function loginSuccess(result) {
  return {
    type: LOGIN_SUCCESS,
    payload: result,
  };
}
export function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    payload: err,
  };
}
export function userUpdate(result) {
  return {
    type: USER_UPDATE,
    payload: result,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
