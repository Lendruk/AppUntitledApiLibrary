import React from 'react';
import * as Styles from './styles';
export class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: [
                {
                    icon: "moon-users",
                    title: "Board",
                },
                {
                    icon: "moon-users",
                    title: "Members",
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
        return (
            <Styles.SidebarOption>
                <div>
                    <span className={option.icon} />
                    {option.title}
                </div>
            </Styles.SidebarOption>
        )
    }

    renderOptionWithChildren(option) {
        return (
            <div style={{ width: "100%" }}>
                <Styles.ParentSidebarOption>
                    <span className={option.icon}></span>
                    {option.title}
                </Styles.ParentSidebarOption>
                <div>
                    {option.children.map(elem => (
                        <Styles.ChildOption>
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