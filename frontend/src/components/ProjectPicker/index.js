import React from 'react';
import * as Styles from './styles';
export class ProjectPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            workspaces: [
                {
                    title: "test",
                    _id: "1",
                    projects: [
                        {
                            name: "project1",
                            _id: "",
                        },
                    ],
                },
                {
                    title: "test2",
                    _id: "2",
                    projects: [
                        {
                            name: "project2",
                            _id: "",
                        },
                    ],
                },
            ],
            selectedWorkspace:  {},
        };
    }

    render() {
        const { selectedWorkspace, workspaces } = this.state;
        return (
            <Styles.Container id="project-picker">
                <Styles.Workspaces>
                    <span>Workspaces</span>
                    {workspaces ? workspaces.map(workspace => (
                        <Styles.WorkspaceOption  selected={selectedWorkspace._id === workspace._id} onClick={() => this.setState({ selectedWorkspace: workspace })}>{workspace.title}</Styles.WorkspaceOption>
                    )) : <div>No work spaces</div> }
                    
                </Styles.Workspaces>
                
                <Styles.Projects>
                    <span>Projects</span>
                    {selectedWorkspace.projects && selectedWorkspace.projects.map(project => (
                        <Styles.ProjectOption>
                            <div>{project.name}</div><div className="updated-text">Updated X time ago</div>
                        </Styles.ProjectOption>
                    ))}
                </Styles.Projects>
            </Styles.Container>
        )
    }
}