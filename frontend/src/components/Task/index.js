import React from 'react';
import * as Styles from './styles';
import { Input } from '../Input/styles';
export class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.onMouseTask = this.onMouseTask.bind(this);
        this.onMouseUpTask = this.onMouseUpTask.bind(this);
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
                return "gray";
            case "GENERIC":
                return "orange";

        }
    }

    getIconOfCard(type) {
        switch(type) {
            case "BUG": 
                return "moon-warning";
            case "STORY":
                return "moon-users";
            case "IDEA":
                return "moon-list";
            case "IMPROVEMENT":
                return "moon-users";
            case "GENERIC":
                return "moon-users";

        }
    }

    renderEditTaskTitle() {
        const { task, onEditTaskTitle,editTitleValue, onInteractionTitle, onBlur } = this.props;
        return (
            <Input id="task-title-input" onBlur={e => onBlur(e)} onKeyUp={ e => onInteractionTitle(e)} value={editTitleValue} onChange={e => onEditTaskTitle(e)}/>
        );
    }

    render() {
        const { task, editingTitle } = this.props;
        return (
        <Styles.Task id={`task_${task._id}`} onMouseUp={e => this.onMouseUpTask(e,task._id)} onMouseDown={e => this.onMouseTask(e,task._id)} color={this.getColorOfCard(task.type)}>
            <Styles.Poly color={this.getColorOfCard(task.type)} >
                <span className={this.getIconOfCard(task.type)} /> 
                <svg width="50" height="50">
                    <polygon points="0,0 50,0 0,50" />
                </svg>
            </Styles.Poly>
            {editingTitle ? this.renderEditTaskTitle() : <Styles.TaskTitle>{task.title}</Styles.TaskTitle>}    
            <Styles.Description>
            {task.description}
            </Styles.Description>
            <Styles.Tags>
                {task.tags && task.tags.map(tag => (
                    <Styles.Tag colour={tag.colour}>{tag.name}</Styles.Tag>
                ))}
            </Styles.Tags>
        </Styles.Task>
        )
    }

    onMouseTask(e, id) {
        // e.stopPropagation();
        const elem = document.getElementById(`task_${id}`);
        if(elem) {
            elem.style.cursor = "grabbing";
            elem.style.userSelect = "none";
        }

        
    }

    onMouseUpTask(e, id) {
        const elem = document.getElementById(`task_${id}`);

        if(elem) {
            elem.style.cursor = "grab";
            elem.style.userSelect = "unset";
        }
    }
}