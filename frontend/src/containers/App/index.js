import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from '../Board';
import Homepage from '../Homepage';
import { Sidebar } from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import * as Styles from '../ContentContainer/styles';
import CreateWorkspace from '../CreateWorkspace';

class App extends React.Component {
    get isLoggedInUser() {
        try {
            const { user, token } = this.props.login;
            return Boolean(user && token);
        } catch (err) {
            return false;
        }
    }

    renderNotFound() {
        return (
            <>
                {/*<Route exact path="/not-found" component={NotFound} />
                <Redirect to="/not-found" />*/}
            </>
        );
    }

    renderRoutes() {
        if (!this.isLoggedInUser || !localStorage.getItem("token")) {
            return (
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Redirect to="/" />
                    {this.renderNotFound()}
                </Switch>
            );
        }
        console.log("FDMDKDKD", this.props.currentProject);
        if (this.isLoggedInUser) {
            return (
                <>
                        <Navbar />
                        <Styles.Container>
                            <Sidebar>

                            </Sidebar>
                            <div style={{ flex: 1 }}>
                                <Switch>
                                    <Route exact path="/" component={Board} />
                                    <Route exact path="/create-workspace" component={CreateWorkspace} />
                                    <Redirect to="/" />
                                    {this.renderNotFound()}
                                </Switch>
                            </div>
                        </Styles.Container>
                </>
            );
        }
    }

    render() {
        return (
            <>
                {this.renderRoutes()}
                <ToastContainer
                    toastClassName="BBToast"
                    bodyClassName="BBToastBody"
                    hideProgressBar
                    closeButton={<></>}
                    position={toast.POSITION.BOTTOM_RIGHT}
                    autoClose={3000}
                />
            </>
        );
    }
}

App.propTypes = {
    login: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    login: state => state.login,
    currentProject: state => state.currentProject,
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

export default compose(withConnect)(App);