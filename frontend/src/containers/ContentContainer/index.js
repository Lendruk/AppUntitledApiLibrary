import React from 'react';
import * as Styles from './styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

export default class ContentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            projects: [],
            currentProject: {
                columns: [
                    {
                        name: "col1",
                        tasks: [],
                    },
                    {
                        name: "col2",
                        tasks: [],
                    },
                    {
                        name: "col3",
                        tasks: [],
                    },
                ]
            },
        }
    }

    componentDidMount() {
        const { currentProject } = this.state;
    }

    render() {
        const { projects, currentProject } = this.state;
        return (
            <>
                <Navbar />
                <Styles.Container>
                    <Sidebar>

                    </Sidebar>
                    <div style={{ flex: 1 }}>
                        {this.props.children}
                    </div>
                </Styles.Container>
            </>
        )
    }
}

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(ContentContainer);