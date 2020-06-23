import React from 'react';
import * as Styles from './styles';

export class NoProjects extends React.Component {

    render() {
        return (
            <Styles.EmptyContainer>
                <span className="moon-users" />
                <span className="title">No Projects Created</span>
                <button>Create a new project</button>
            </Styles.EmptyContainer>
        )
    }
}