import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Styles from './styles';
import { Input } from '../../components/Input';
import makeSelectRegister from './selectors';
import { showToast } from '../../components/Toast';
import Strings from '../../utils/strings';
import { post } from '../../utils/api';
import { uriRegisterUser } from '../../utils/endpoints';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.register();
    }

    async register() {
        const { name, email, password } = this.state;

        if (this.validateForm()) {
            const body = {
                name,
                email,
                password
            }

            const result = await post(uriRegisterUser, body);

            if (result.status >= 200 && result.status < 400) {
                showToast("SUCCESS", result.data.message);
                this.props.changeAuthMode(true, email);
            }
        }
    }

    validateForm = () => {
        const { name, email, password, confirmPassword } = this.state;
        if (!name || !email || !password || !confirmPassword) return showToast("ERROR", Strings.auth.missingFields);
        if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/)) return showToast("ERROR", Strings.auth.insertValidEmail);
        if (password !== confirmPassword) return showToast("ERROR", Strings.auth.passwordMismatch);
        return true;
    }

    render() {
        const { name, email, password, confirmPassword } = this.state;

        return (
            <div>
                <Styles.AuthTitle>Sign Up</Styles.AuthTitle>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <Styles.InputGroup>
                        <Input style={{ marginBottom: 10 }} placeholder="Name" name="name" label="name" value={name} onChange={this.handleChange} />
                        <Input style={{ marginBottom: 10 }} placeholder="Email" name="email" label="email" value={email} onChange={this.handleChange} />
                        <Input style={{ marginBottom: 10 }} type="password" placeholder="Password" name="password" label="password" value={password} onChange={this.handleChange} />
                        <Input style={{ marginBottom: 10 }} type="password" placeholder="Confirm Password" name="confirmPassword" label="confirm password" value={confirmPassword} onChange={this.handleChange} />
                    </Styles.InputGroup>
                    <Styles.AuthOptions>
                        <Styles.AuthButton>Register</Styles.AuthButton>
                        <span>or</span>
                        <Styles.Signup onClick={() => this.props.changeAuthMode(true)}>Login</Styles.Signup>
                    </Styles.AuthOptions>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Register);