import React from 'react';
import * as Styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Task } from '../../components/Task';
import { Draggable } from '../../components/Draggable';
import { Droppable } from '../../components/Droppable';
import Modal from 'react-modal';
import { post, patch, remove, put } from '../../utils/api';
import { uriColumns, uriCreateTasks, uriTasks } from '../../utils/endpoints';
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProject: props.currentProject,
            // currentProject: {
            //     columns: [
            //         {
            //             name: "col1",
            //             _id: 1,
            //             tasks: [
            //                 {
            //                     title: "test task",
            //                     type: "BUG",
            //                     _id: 1,
            //                 },
            //                 {
            //                     title: "test task2",
            //                     description: "Lorem ipsum dolor sit amet",
            //                     type: "IMPROVEMENT",
            //                     tags: [
            //                         {
            //                             name: "tag1",
            //                             colour: "red",
            //                         },
            //                     ],
            //                     _id: 2,
            //                 },
            //             ],
            //         },
            //         {
            //             name: "col2",
            //             _id: 2,
            //             tasks: [],
            //         },
            //         {
            //             name: "col3",
            //             _id: 3,
            //             tasks: [],
            //         },
            //     ]
            // },
            tempColName: "",
            tempTaskTitle: "",
            editTaskNameId: "",
            showEdit: false,
            editingTitle: false,
            colInEdit: "",
            taskInEdit: null,
            projects: [],
        }

        this.onEditTaskTitleKeyPress = this.onEditTaskTitleKeyPress.bind(this);
    }

    componentDidMount() {
        this.state.currentProject = this.props.currentProject;

        this.setState({ currentProject: this.props.currentProject });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentProject: nextProps.currentProject });
    }


    render() {
        const { currentProject } = this.state;
        return Object.keys(currentProject).length > 0 ? this.renderBoard() : null;
    }

    renderNoTasks() {
        return (
            <Styles.NoTasks>
                No Tasks
            </Styles.NoTasks>
        )
    }

    async onDropTask(id, colId) {
       const { currentProject } = this.state;
       const { columns } = currentProject;
        const taskId = id.split("_")[1];
        let task;
        let oldColumnId = "";
        for(const column of columns) {
            const index = column.tasks.findIndex(elem => elem._id == taskId);
            
            if(index !== -1) {
                task = column.tasks.splice(index, 1)[0];
                oldColumnId = column._id;
                break;
            }
        }
        const col = columns.find(elem => elem._id === colId);
        col.tasks.push(task);
        this.setState({ currentProject: { ...currentProject, columns: columns } }, async () => {
            await patch(uriCreateTasks(`${currentProject._id}/${task._id}`), { oldColumnId, newColumnId: col._id });
        });
    }

    addColumn() {
        const { currentProject } = this.state;
        const { columns } = currentProject;
        const newColumn = { name: "New Column", tasks: [], _id: "new_column" };
        columns.push(newColumn);
        this.setState({ currentProject });
        this.editColumnTitle(newColumn._id);
    }

    editColumnTitle(colId) {
        const { currentProject, colInEdit } = this.state;
        const { columns } = currentProject;
        if(colInEdit === "") {
            const column = columns.find(elem => elem._id === colId);
            this.setState({ colInEdit: colId, tempColName: column.name }, () => document.getElementById("column-title-input").focus());
        }
    }

    onEditColumnName(value) {
        this.setState({ tempColName: value.target.value });
    }

    getColorOfCard(type) {
        switch(type) {
            case "BUG": 
                return "red";
            case "STORY":
                return "blue";
            case "IDEA":
                return "yellow";
            case "IMPROVEMENT":
                return "black";
            case "GENERIC":
                return "orange";

        }
    }

    async onEditKeyPress(event, index) {
        const { tempColName, currentProject } = this.state; 
        if((event.which || event.key) === 13) {
            const { columns } = currentProject;
            columns[index].name = tempColName;
            this.setState({ colInEdit: "", tempColName: "", currentProject });
            if(currentProject.columns[index]._id !== "new_column") {
                await put(uriColumns(columns[index]._id), { name: tempColName, projectId: currentProject._id });
            } else {
                await post(uriColumns(), { name: tempColName, projectId: currentProject._id });
            }
        } else if(event.which === 27) {
            if(currentProject.columns[index]._id === "new_column") {
                currentProject.columns.splice(index, 1);
            }
            this.setState({ colInEdit: "", tempColName: "", currentProject });
        }
    }

    async onEditTaskTitleKeyPress(event, columnIndex, task) {
        const { currentProject, tempTaskTitle } = this.state;
        if(event.which === 13) { // Enter
            const { columns } = currentProject;
            delete task._id;
            const taskRes = await post(uriCreateTasks(currentProject._id), { columnId: columns[columnIndex]._id, ...task, title: tempTaskTitle });
            const index = currentProject.columns[columnIndex].tasks.findIndex(elem => elem._id === task._id);
            currentProject.columns[columnIndex].tasks[index] = taskRes.data.task;
            
            task = taskRes.data.task;
            this.setState({ editTaskNameId: "", tempTaskTitle: "", currentProject });
        } else if(event.which === 27) { // Esc
            const index = currentProject.columns[columnIndex].tasks.findIndex(elem => elem === task);
            if(index !== -1) {
                currentProject.columns[columnIndex].tasks.splice(index, 1);
            }
            this.setState({ editTaskNameId: "", tempTaskTitle: "", currentProject });
        }
    }

    addTask(column, colIndex) {
        const { currentProject } = this.state;

        const newTask = { title: "New Task", type: "GENERIC", _id: "new_task" };

        currentProject.columns[colIndex].tasks.push(newTask);

        this.setState({ currentProject, tempTaskTitle: newTask.title, editTaskNameId: newTask._id }, () => {
            const node = document.getElementById("task-title-input").focus();
        });


    } 

    onEditTitle(event) {
        if((event.which || event.key) === 13 || event.which === 27) {
            this.setState({ editingTitle: false }, () => this.updateTask());
        }
    }

    async updateTask() {
        const { taskInEdit, currentProject } = this.state;
        if(taskInEdit) {
            const res = await put(uriTasks(taskInEdit._id), 
            { 
                title: taskInEdit.title,
                description: taskInEdit.description, 
                tags: taskInEdit.tags || [],
            });
            if(res.status >= 200 && res.status < 400) {
                const col = currentProject.columns[taskInEdit.col.index];
                const index = col.tasks.findIndex(tsk => tsk._id === taskInEdit._id);
                if(index !== -1) {
                    col.tasks[index] = { ...res.data.task, col: taskInEdit.col };
                    this.setState({ currentProject, taskInEdit: { ...res.data.task, col: taskInEdit.col }});
                }
            }
        }
    }

    async deleteTask() {
        const { taskInEdit, currentProject } = this.state;
        if(taskInEdit) {
           const res = await remove(uriCreateTasks(`${currentProject._id}/${taskInEdit.col._id}/${taskInEdit._id}`));
            if(res.status >= 200 && res.status < 400) {
                const taskIndex = currentProject.columns[taskInEdit.col.index].tasks.findIndex(tsk => tsk._id === taskInEdit._id);
                if(taskIndex !== -1) {
                    currentProject.columns[taskInEdit.col.index].tasks.splice(taskIndex, 1);
                }

                this.setState({ currentProject, taskInEdit: null });
            }
        }
    }

    renderTaskModal() {
        const { taskInEdit, showEdit, editingTitle } = this.state;

        if(!taskInEdit) return null;

        const taskHasDescription = taskInEdit.description != null;
        return (
            <Styles.ModalContainer>
                <Styles.TaskContent borderColour={this.getColorOfCard(taskInEdit.type)} >
                    {editingTitle ? (
                        <Styles.TitleInput 
                            value={taskInEdit.title} 
                            onChange={val => this.setState({ taskInEdit: { ...taskInEdit, title: val.target.value }})}
                            onKeyPress={event => this.onEditTitle(event)}
                        />
                    ) : (
                        <Styles.TaskTitle 
                            onClick={() => this.setState({ editingTitle: true })}
                            onMouseLeave={() => this.setState({ showEdit: false })} 
                            onMouseEnter={() => {  this.setState({showEdit: true})}}>
                                {taskInEdit.title}<span style={{ display: showEdit ? 'inline' : 'none' }} className="moon-pencil" />
                        </Styles.TaskTitle>
                    )}
                    <Styles.TaskDescription onChange={val => this.setState({ taskInEdit: { ...taskInEdit, description: val.target.value } })} onBlur={() => this.updateTask()} value={taskInEdit.description} placeholder={"Add a description..."} textColour={"black"}>
                    </Styles.TaskDescription>
                    <Styles.TaskTags>
                        {taskInEdit.tags && taskInEdit.tags.map(tag => (
                            <Styles.Tag colour={tag.colour}>
                                {tag.name}
                            </Styles.Tag>
                            )
                        )}
                    </Styles.TaskTags>
                    <Styles.HorizontalSeparator />
                    <Styles.SubTitle>Comments</Styles.SubTitle>
                    <Styles.Comments>

                    </Styles.Comments>
                </Styles.TaskContent>
                <Styles.TaskActions>
                    <Styles.TaskAction onClick={() => this.deleteTask()}>
                        <span className="moon-bin" />
                    </Styles.TaskAction>
                </Styles.TaskActions>
            </Styles.ModalContainer>
        );
    }

    renderBoard() {
        const { currentProject, colInEdit, tempColName, taskInEdit, editTaskNameId, tempTaskTitle } = this.state;
        return (
            <>
            <Styles.Board key={currentProject._id}>
                {currentProject && currentProject.columns && currentProject.columns.map((col,index) => (
                    <Styles.Column key={col._id}>
                        <Styles.ColumnTitle>
                            {colInEdit == col._id ? (
                                <Styles.ColumnTitleInput id="column-title-input" value={tempColName} onBlur={() => this.setState({ colInEdit: "", tempColName: "" })} onKeyUp={e => this.onEditKeyPress(e, index)} onChange={val => this.onEditColumnName(val)} />
                            ) : <span onClick={() => this.editColumnTitle(col._id)} className="title-value">{col.name}</span>}
                        </Styles.ColumnTitle>
                        <Droppable onDrop={id => this.onDropTask(id,col._id)} style={{ height: '100%' }} id={`col_${col.name}`}>
                            
                                {col.tasks.length > 0 ? col.tasks.map(task => (
                                    <Draggable onClick={() => this.setState({ taskInEdit: { ...task, col: { ...col, index }}})} id={`tsk_${task._id}`}>
                                        <Task onEditTaskTitle={e => this.setState({ tempTaskTitle: e.target.value })}
                                         editTitleValue={tempTaskTitle}
                                         onInteractionTitle={ e => this.onEditTaskTitleKeyPress(e, index, task)}
                                         editingTitle={editTaskNameId === task._id} task={task} />
                                    </Draggable>
                                )) : this.renderNoTasks()}     
                        {editTaskNameId === "" && <Styles.AddTask onClick={() => this.addTask(col, index)}>
                            <div />
                            <span className="moon-plus"  />
                            <div />
                        </Styles.AddTask>
                        }
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

Board.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    projects: state => state.projects,
    workspaces: state => state.workspaces,
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

export default compose(withConnect)(Board);