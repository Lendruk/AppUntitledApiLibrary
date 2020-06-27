import React from 'react';
import * as Styles from './styles';
import { Input } from '../../components/Input';
import { showToast } from '../../components/Toast';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { post } from '../../utils/api';
import { uriWorkspaces, uriProjects } from '../../utils/endpoints';
import { genRequestHeader } from "../../utils/api";
import { setWorkspaces } from '../App/actions';

class CreateWorkspace extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            workspaceName: "",
            projectName: "",
            creatingWorkspace: true,
            createdWorkspace: {},
        };
    }

    async createProject() {
        const { projectName, createdWorkspace } = this.state;

        if(projectName) { 
            const headers = genRequestHeader();
            headers.workspace = createdWorkspace._id;
            const res = await post(uriProjects(""), { title: projectName }, headers);
        } else {
            showToast("ERROR", "Name can't be empty");
        }
    }

    async createWorkspace() {
        const { workspaceName } = this.state;

        if(workspaceName) {
            const res = await post(uriWorkspaces(""), { name: workspaceName });
            const { workspaces } = res.data;
            
            console.log("workspaces", res);
            this.props.dispatch(setWorkspaces(workspaces));
            this.setState({ creatingWorkspace: false, createdWorkspace: workspaces[0] });
        } else {
            showToast("ERROR", "Name can't be empty");
        }
    }

    render() {
        const { creatingWorkspace, workspaceName, projectName } = this.state;
        return (
            <Styles.Container>
                <Styles.Title>Setup your workspace</Styles.Title>
                <Styles.InputContainer>
                    <Input style={{ width: 500 }} 
                    value={creatingWorkspace ? workspaceName : projectName}
                    onChange={val => creatingWorkspace ? this.setState({ workspaceName: val.target.value }) : this.setState({ projectName: val.target.value })}
                    label={creatingWorkspace ? "Workspace name" : "Project name"} 
                    placeholder={"Name..."}/>
                </Styles.InputContainer>
                <Styles.Button onClick={() => creatingWorkspace ? this.createWorkspace() : this.createProject()}>
                    Next
                </Styles.Button> 
            </Styles.Container>
        );
    }
}

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(CreateWorkspace);