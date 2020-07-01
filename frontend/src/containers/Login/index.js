import React from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Styles from './styles';
import { Input } from '../../components/Input';
import { showToast } from '../../components/Toast';
import { post, get } from '../../utils/api';
import { uriLogin, uriWorkspaces, uriProjects } from '../../utils/endpoints';
import reducer from './reducer';
import makeSelectLogin from './selectors';
import injectReducer from '../../utils/injectReducer';
import { loginSuccess, loginFail, logout } from './actions'
import Strings from '../../utils/strings';
import { setWorkspaces, setCurrentProject } from '../App/actions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email || '',
            password: '',
        };
    }

    componentDidMount() {
        setImmediate(() => {
            if (!localStorage.getItem('token')) {
                this.props.dispatch(logout());
            }
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.login();
    }

    async login() {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        if (!this.validateForm()) {
            const body = {
                email,
                password
            }

            try {
                let result = '';
                result = await post(uriLogin, body);

                if (result.status >= 200 && result.status < 400) {
                    const { token, user } = result.data;
                    showToast("SUCCESS", result.data.message);
                    dispatch(loginSuccess({ token, user }));
                    const workResponse = await get(uriWorkspaces(""));
                    if (Object.keys(workResponse.data.workspaces).length > 0) {
                        dispatch(setWorkspaces(workResponse.data.workspaces));
                        const projectRes = await get(uriProjects(workResponse.data.workspaces[0].projects[0]));
                        dispatch(setCurrentProject(projectRes.data.project))
                        dispatch(push("/"));
                    } else {
                        dispatch(push("/create-workspace"));                        
                    }
                }
            } catch (err) {
                dispatch(loginFail(err));
            } finally {
            }
        } else {
            showToast("ERROR", Strings.auth.missingFields);
        }
    }

    validateForm = () => {
        const { email, password } = this.state;
        return !email || !password;
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <Styles.AuthTitle>Login</Styles.AuthTitle>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <Styles.InputGroup>
                        <Input style={{ marginBottom: 10 }} placeholder="Email" name="email" label="email" value={email} onChange={this.handleChange} />
                        <Input type="password" placeholder="Password" name="password" label="password" value={password} onChange={this.handleChange} />
                    </Styles.InputGroup>
                    <Styles.AuthOptions>
                        <Styles.AuthButton>Sign In</Styles.AuthButton>
                        <span>or</span>
                        <Styles.Signup onClick={() => this.props.changeAuthMode(false)}>Sign up</Styles.Signup>
                    </Styles.AuthOptions>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    login: makeSelectLogin(),
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

export default compose(withConnect)(
    injectReducer({ key: 'login', reducer })(Login),
);