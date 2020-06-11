import React from 'react';
import * as Styles from './styles';
export class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: [
                {
                    icon: "moon-users",
                    title: "Members",
                },
                {
                    icon: "moon-cogs",
                    title: "Project Settings",
                },
                {
                    icon: "moon-cogs",
                    title: "Workspace Settings",
                },
            ]
        }
    }

    render() {
        const { options } = this.state;
        return (
            <Styles.Container>
                {options.map(option => (
                    <Styles.SidebarOption>
                        <div>
                            <span className={option.icon} />
                            {option.title}
                        </div>
                    </Styles.SidebarOption>
                ))}
            </Styles.Container>
        )
    }
}