import React from 'react';
import * as Styles from './styles';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
export class ContentContainer extends React.Component {
    componentDidMount() {
        console.log(this.props.children);
    }

    render() {
        return (
            <>
                <Navbar />
                <Styles.Container>
                    <Sidebar>

                    </Sidebar>
                <div style={{ flex: 1}}>
                {this.props.children} 
                </div>
                </Styles.Container>
            </>
        )
    }
}