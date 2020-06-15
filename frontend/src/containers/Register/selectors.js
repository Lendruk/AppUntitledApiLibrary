import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterDomain = state => state.register || initialState;

const makeSelectRegister = () =>
    createSelector(
        selectRegisterDomain,
        substate => substate,
    );

export default makeSelectRegister;
export { selectRegisterDomain };