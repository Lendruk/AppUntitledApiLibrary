import React from 'react';

export class Droppable extends React.Component {

    constructor(props) {
        super(props);

        this.drop = this.drop.bind(this);
    }

    drop(e) {
        e.preventDefault();

        const data = e.dataTransfer.getData("transfer");
        e.target.appendChild(document.getElementById(data));

    }

    allowDrop(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div style={this.props.style} id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop}>
                {this.props.children}
            </div>
        );
    }
}