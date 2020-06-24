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
            <div onClick={this.props.onClick} style={this.props.style} id={this.props.id} draggable={true} onDragStart={this.drag} onDragOver={this.noAllowDrop}>
                {this.props.children}
            </div>
        );
    }
}