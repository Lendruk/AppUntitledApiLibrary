import React from 'react';
import * as Styles from './styles';
export class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const { task } = this.props;
        return (
        <Styles.Task>{task.title}</Styles.Task>
        )
    }

}