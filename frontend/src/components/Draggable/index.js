import React from 'react';

export class Draggable extends React.Component {
    constructor(props) {
        super(props);

        this.drag = this.drag.bind(this);
    }

    drag(e) {
        e.dataTransfer.setData("transfer", e.target.id)
    }

    noAllowDrop(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div style={this.props.style} onDragEnd={() => this.props.onDragEnd(this.props.id)} id={this.props.id} draggable={true} onDragStart={this.drag} onDragOver={this.noAllowDrop}>
                {this.props.children}
            </div>
        );
    }
}