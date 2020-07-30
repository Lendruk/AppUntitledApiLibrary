import React from 'react';
import * as Styles from './styles';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: "",
            options: [
                {
                    icon: "moon-list2",
                    title: "Board",
                    location: "/",
                },
                {
                    icon: "moon-users",
                    title: "Members",
                    location: "/members",
                },
                {
                    icon: "moon-cogs",
                    title: "Settings",
                    children: [
                        {
                            title: "Project Settings",
                        },
                        {
                            title: "Workspace Settings",
                        },
                    ],
                },
            ]
        }
    }

    componentDidMount() {
        this.setState({ currentLocation: window.location.pathname });
    }

    goToLocation(location) {
        const { dispatch } = this.props;
        dispatch(push(location));
        this.setState({ currentLocation: location });
    }

    renderNormalOption(option) {
        const { currentLocation } = this.state;
        return (
            <Styles.SidebarOption isActive={currentLocation === option.location} onClick={() => option.location && this.goToLocation(option.location)}>
                <div>
                    <span className={option.icon} />
                    {option.title}
                </div>
            </Styles.SidebarOption>
        )
    }

    renderOptionWithChildren(option) {
        const { currentLocation } = this.state;
        const { dispatch } = this.props;
        return (
            <div style={{ width: "100%" }}>
                <Styles.ParentSidebarOption>
                    <span  className={option.icon}></span>
                    {option.title}
                </Styles.ParentSidebarOption>
                <div>
                    {option.children.map(elem => (
                        <Styles.ChildOption isActive={currentLocation === elem.location}  onClick={() => elem.location && this.goToLocation(elem.location)}>
                            {elem.title}
                        </Styles.ChildOption>
                    ))}
                </div>
            </div>
        )
    }

    render() {
        const { options } = this.state;
        return (
            <Styles.Container>
                {options.map(option => 
                    option.children ? this.renderOptionWithChildren(option) : this.renderNormalOption(option)
                )}
            </Styles.Container>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(Sidebar);