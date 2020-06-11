import React from 'react';
import * as Styles from './styles';
export class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentProject: {},
            projects: [],
        }
    }


    render() {
        const { projects } = this.state;
        return projects.length > 0 ? this.renderBoard() : this.renderEmpty();
    }
    
    renderBoard() {
        return (
            <div>test123</div>
        )
    }

    renderEmpty() {
        return (
            <Styles.EmptyContainer>
                <span className="moon-users" />
                <span className="title">No Projects Created</span>
                <button>Create a new project</button>
            </Styles.EmptyContainer>
        )
    }
}