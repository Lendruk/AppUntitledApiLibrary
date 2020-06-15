import React from 'react';
import * as Styles from './styles';
import { Task } from '../../components/Task';
export class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentProject: {
                columns: [
                    {
                        name: "col1",
                        tasks: [
                            {
                                title: "test task",
                            }
                        ],
                    },
                    {
                        name: "col2",
                        tasks: [],
                    },
                    {
                        name: "col3",
                        tasks: [],
                    },
                ]
            },
            projects: [],
        }
    }


    render() {
        return this.renderBoard();
    }

    renderNoTasks() {
        return (
            <Styles.NoTasks>
                No Tasks
            </Styles.NoTasks>
        )
    }

    renderBoard() {
        const { currentProject } = this.state;
        console.log(currentProject);
        return (
            <Styles.Board>
                {currentProject && currentProject.columns.map(col => (
                    <Styles.Column>
                        <Styles.ColumnTitle>
                            {col.name}
                        </Styles.ColumnTitle>
                        <Styles.Tasks>
                            {col.tasks.length > 0 ? col.tasks.map(task => (
                                <Task task={task} />
                            )) : this.renderNoTasks()}
                        </Styles.Tasks>
                    </Styles.Column>
                ))}
                <Styles.AddColumn >
                    <span className="moon-users">

                    </span>
                </Styles.AddColumn>

            </Styles.Board>
        )
    }
}