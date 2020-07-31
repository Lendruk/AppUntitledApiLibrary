import React from "react";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as Styles from "./styles";
class Members extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            searchValue: "",
            
        };


    }

    render() {
        const { currentProject } = this.props;
        const { searchValue } = this.state;
        return (
            <Styles.Container>
                <h3>Users</h3>
                <Styles.SearchInput value={searchValue} onChange={event => this.setState({ searchValue: event.target.value })}  placeholder={"Search..."} />
                <Styles.UserTable>
                        <Styles.RowLabels>
                            <div>Name</div>
                            <div>Roles</div>
                        </Styles.RowLabels>
                    {currentProject.users.map(usrPair => (
                        <Styles.User>
                            <div>{usrPair.user.name}</div>
                            <Styles.Roles>
                                {usrPair.roles.map(role => (
                                    <Styles.Role colour={role.colour || "#185C77"}>
                                        {role.name}
                                    </Styles.Role>
                                ))}
                            </Styles.Roles>
                        </Styles.User>
                    ))}
                </Styles.UserTable>
            </Styles.Container>
        );
    }
}

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(Members);