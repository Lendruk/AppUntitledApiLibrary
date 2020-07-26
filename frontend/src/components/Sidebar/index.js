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
            options: [
                {
                    icon: "moon-users",
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

    renderNormalOption(option) {
        const { dispatch } = this.props;
        return (
            <Styles.SidebarOption onClick={() => option.location && dispatch(push(option.location))}>
                <div>
                    <span className={option.icon} />
                    {option.title}
                </div>
            </Styles.SidebarOption>
        )
    }

    renderOptionWithChildren(option) {
        const { dispatch } = this.props;
        return (
            <div style={{ width: "100%" }}>
                <Styles.ParentSidebarOption>
                    <span  className={option.icon}></span>
                    {option.title}
                </Styles.ParentSidebarOption>
                <div>
                    {option.children.map(elem => (
                        <Styles.ChildOption onClick={() => elem.location && dispatch(push(elem.location))}>
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