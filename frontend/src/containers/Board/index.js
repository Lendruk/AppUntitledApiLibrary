import React from 'react';
import * as Styles from './styles';
import { Task } from '../../components/Task';
import { Draggable } from '../../components/Draggable';
import { Droppable } from '../../components/Droppable';
import Modal from 'react-modal';
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
            tempColName: "",
            colInEdit: "",
            taskInEdit: null,
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
       const { currentProject } = this.state;
       const { columns } = currentProject;
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
        this.setState({ currentProject: { ...currentProject, columns: columns } });
    }

    addColumn() {
        const { currentProject } = this.state;
        const { columns } = currentProject;
        const newColumn = { name: "New Column", tasks: [], _id: "test" };
        columns.push(newColumn);
        this.setState({ currentProject });
        this.editColumnTitle(newColumn._id);
    }

    editColumnTitle(colId) {
        const { currentProject, colInEdit } = this.state;
        const { columns } = currentProject;
        if(colInEdit === "") {
            const column = columns.find(elem => elem._id === colId);
            this.setState({ colInEdit: colId, tempColName: column.name });
        }
    }

    onEditColumnName(value) {
        this.setState({ tempColName: value.target.value });
    }

    onEditKeyPress(event, index) {
        const { tempColName, currentProject } = this.state; 
        if((event.which || event.key) === 13) {
            const { columns } = currentProject;
            columns[index].name = tempColName;
            this.setState({ colInEdit: "", tempColName: "", currentProject });
        } else if(event.which === 27) {
            this.setState({ colInEdit: "", tempColName: "", currentProject });
        }
    }

    addTask(column, colIndex) {
        const { currentProject } = this.state;

        const newTask = { title: "New Task", type: "TASK" };

        currentProject.columns[colIndex].tasks.push(newTask);

        this.setState({ currentProject });
    } 

    renderTaskModal() {
        return <div>
            Task Here
        </div>
    }

    renderBoard() {
        const { currentProject, colInEdit, tempColName, taskInEdit } = this.state;
        return (
            <>
            <Styles.Board>
                {currentProject && currentProject.columns.map((col,index) => (
                    <Styles.Column>
                        <Styles.ColumnTitle>
                            {colInEdit == col._id ? (
                                <Styles.ColumnTitleInput value={tempColName} onBlur={() => this.setState({ colInEdit: "", tempColName: "" })} onKeyUp={e => this.onEditKeyPress(e, index)} onChange={val => this.onEditColumnName(val)} />
                            ) : <span onClick={() => this.editColumnTitle(col._id)} className="title-value">{col.name}</span>}
                        </Styles.ColumnTitle>
                        <Droppable onDrop={id => this.onDropTask(id,col._id)} style={{ height: '100%' }} id={`col_${col.name}`}>
                            
                                {col.tasks.length > 0 ? col.tasks.map(task => (
                                    <Draggable onClick={() => this.setState({ taskInEdit: task })} id={`tsk_${task._id}`}>
                                        <Task task={task} />
                                    </Draggable>
                                )) : this.renderNoTasks()}     
                        <Styles.AddTask onClick={() => this.addTask(col, index)}>
                            <div />
                            <span className="moon-plus"  />
                            <div />
                        </Styles.AddTask>
                        </Droppable>
                    </Styles.Column>
                ))}
                <Styles.AddColumn >
                    <span onClick={() => this.addColumn()} className="moon-plus">

                    </span>
                </Styles.AddColumn>

            </Styles.Board>
            <Modal
                isOpen={taskInEdit}
                onRequestClose={() => { this.setState({ taskInEdit: null })}}
                closeOnEscape
                style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						padding: 0,
						background: 'transparent',
						border: 'none',
						borderRadius: '8px',
					},
					overlay: {
						zIndex: 998,
						backgroundColor: 'rgba(0,0,0,0.5)',
					},
				}}
            >
                {this.renderTaskModal()}
            </Modal>
            </>
        )
    }
}