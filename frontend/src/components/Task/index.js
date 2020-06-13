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
        <Styles.Task>
            <Styles.Poly >
                <span className="moon-users" /> 
                <svg width="50" height="50">
                    <polygon points="0,0 50,0 0,50" />
                </svg>
            </Styles.Poly>
            <Styles.TaskTitle>{task.title}</Styles.TaskTitle>    
            <Styles.Tags>
                <Styles.Tag>test</Styles.Tag>
            </Styles.Tags>
        </Styles.Task>
        )
    }

}