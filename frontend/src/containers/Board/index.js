import React from 'react';
import * as Styles from './styles';
import { Task } from '../../components/Task';
import { Draggable } from '../../components/Draggable';
import { Droppable } from '../../components/Droppable';
export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.onMouseTask = this.onMouseTask.bind(this);
        this.onMouseUpTask = this.onMouseUpTask.bind(this);
        this.state = {
            currentProject: {
                columns: [
                    {
                        name: "col1",
                        tasks: [
                            {
                                title: "test task",
                                type: "BUG",
                                _id: 1,
                            },
                            {
                                title: "test task2",
                                type: "IMPROVEMENT",
                                _id: 2,
                            },
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
                        <Droppable style={{ height: '100%' }} id={`col_${col.name}`}>
                            <Styles.Tasks>
                                {col.tasks.length > 0 ? col.tasks.map(task => (
                                    <Draggable id={`tsk_${task._id}`}>
                                        <Task onDrag={() => {}} onMouseUp={this.onMouseUpTask} onMouseDown={this.onMouseTask} task={task} />
                                    </Draggable>
                                )) : this.renderNoTasks()}
                            </Styles.Tasks>
                        </Droppable>
                       
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