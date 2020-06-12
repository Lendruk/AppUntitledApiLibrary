import React from 'react';
import * as Styles from './styles';
import { ProjectPicker } from '../ProjectPicker';
export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            openProjectPicker: false,
        }

        this.handleProjectPickerClick = this.handleProjectPickerClick.bind(this);
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleProjectPickerClick);
    }

    handleProjectPickerClick(e) {  
        const { openProjectPicker } = this.state;
        const projectPicker = document.getElementById("project-picker");
 
        if(openProjectPicker && !projectPicker.contains(e.target)) {
            this.setState({ openProjectPicker: false });
            window.removeEventListener("mousedown", this.handleProjectPickerClick);
        }
    }

    render() {
        const { openProjectPicker } = this.state;
        return (
            <Styles.Container>
                <Styles.Breadcrumb>
                    <Styles.Icon>
                        <span className="moon-users" />
                    </Styles.Icon>
                    <span className="moon-back breadcrumb-arrow" />
                    <div>Workspace name</div>
                    <span className="moon-back breadcrumb-arrow" />
                    <Styles.ProjectSelector  onClick={e => {
                        this.setState({ openProjectPicker: true }, () =>{
                            window.addEventListener("mousedown", this.handleProjectPickerClick);
                        })
                        }}>
                        <div>Project name</div>
                        <span className="moon-back" />
                        {openProjectPicker && <ProjectPicker />}
                    </Styles.ProjectSelector>
                </Styles.Breadcrumb>
                <Styles.UserOptions>
                    <div className="userProfile">
                        <span className="moon-user" />
                    </div>
                </Styles.UserOptions>
            </Styles.Container>
        )
    }
}