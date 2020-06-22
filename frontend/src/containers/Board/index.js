import React from 'react';
import * as Styles from './styles';
import { Task } from '../../components/Task';
import { Draggable } from '../../components/Draggable';
import { Droppable } from '../../components/Droppable';
export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProject: {
                columns: [
                    {
                        name: "col1",
                        _id: 1,
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
                        _id: 2,
                        tasks: [],
                    },
                    {
                        name: "col3",
                        _id: 3,
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

    onDropTask(id, colId) {
       const { currentProject: { columns } } = this.state;
        const taskId = id.split("_")[1];
        let task;
        for(const column of columns) {
            const index = column.tasks.findIndex(elem => elem._id == taskId);
            
            if(index !== -1) {
                task = column.tasks.splice(index, 1)[0];
                break;
            }
        }
        const col = columns.find(elem => elem._id === colId);
        col.tasks.push(task);
        this.setState({ columns });
    }

    renderBoard() {
        const { currentProject } = this.state;
        return (
            <Styles.Board>
                {currentProject && currentProject.columns.map(col => (
                    <Styles.Column>
                        <Styles.ColumnTitle>
                            {col.name}
                        </Styles.ColumnTitle>
                        <Droppable onDrop={id => this.onDropTask(id,col._id)} style={{ height: '100%' }} id={`col_${col.name}`}>
                            
                                {col.tasks.length > 0 ? col.tasks.map(task => (
                                    <Draggable id={`tsk_${task._id}`}>
                                        <Task task={task} />
                                    </Draggable>
                                )) : this.renderNoTasks()}
                           
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