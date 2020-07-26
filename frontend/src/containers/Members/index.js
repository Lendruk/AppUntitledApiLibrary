import React from "react";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as Styles from "./styles";
class Members extends React.Component {
    constructor(props) {
        super(props);

        this.state= {

        };


    }

    render() {
        const { currentProject } = this.props;
        console.log("currentProject", currentProject);
        return (
            <Styles.Container>
                {currentProject.users.map(user => (
                    <div>user</div>
                ))}
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