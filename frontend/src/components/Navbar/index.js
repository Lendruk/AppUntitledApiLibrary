import React from 'react';
import * as Styles from './styles';
import { ProjectPicker } from '../ProjectPicker';
import { logout } from '../../containers/Login/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { uriLogout } from '../../utils/endpoints'
import { post } from '../../utils/api';
import PropTypes from 'prop-types';
import { showToast } from '../Toast';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openProjectPicker: false,
        }

        this.logout = this.logout.bind(this);
        this.handleProjectPickerClick = this.handleProjectPickerClick.bind(this);
    }

    async logout() {
        const { dispatch } = this.props;
        let result = '';
        result = await post(uriLogout, {});

        if (result.status >= 200 && result.status < 400) {
            showToast("SUCCESS", result.data.message);
            dispatch(logout());
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleProjectPickerClick);
    }

    handleProjectPickerClick(e) {
        const { openProjectPicker } = this.state;
        const projectPicker = document.getElementById("project-picker");

        if (openProjectPicker && !projectPicker.contains(e.target)) {
            this.setState({ openProjectPicker: false });
            window.removeEventListener("mousedown", this.handleProjectPickerClick);
        }
    }

    render() {
        const { openProjectPicker } = this.state;
        return (
            <Styles.Container>
                <Styles.Logo></Styles.Logo>
                <Styles.Navbar>
                    <Styles.Breadcrumb>
                        <Styles.Icon>
                            <span className="moon-home" />
                        </Styles.Icon>
                        <span className="moon-back breadcrumb-arrow" />
                        <div>Workspace name</div>
                        <span className="moon-back breadcrumb-arrow" />
                        <Styles.ProjectSelector onClick={e => {
                            this.setState({ openProjectPicker: true }, () => {
                                window.addEventListener("mousedown", this.handleProjectPickerClick);
                            })
                        }}>
                            <div>Project name</div>
                            <span className="moon-back" />
                            {openProjectPicker && <ProjectPicker />}
                        </Styles.ProjectSelector>
                    </Styles.Breadcrumb>
                    <Styles.UserOptions>
                        <div className="userProfile">
                            <span className="moon-user" />
                        </div>
                        <div className="logOut">
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    </Styles.UserOptions>
                </Styles.Navbar>
            </Styles.Container>
        )
    }
}

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    router: state => state.router,
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

export default compose(withConnect)(Navbar);