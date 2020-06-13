import React from 'react';
import * as Styles from './styles';
export class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const { task } = this.props;
        return (
        <Styles.Task>
            <Styles.Poly >
                <span className="moon-users" /> 
                <svg width="50" height="50">
                    <polygon points="0,0 50,0 0,50" />
                </svg>
            </Styles.Poly>
            <Styles.TaskTitle>{task.title}</Styles.TaskTitle>    
            <Styles.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel imperdiet risus, ac tempus odio. Duis ultrices tortor sit amet risus ornare, eu efficitur leo viverra. Proin sed urna tristique, facilisis risus sed, auctor velit. Proin commodo eget massa eget faucibus. Pellentesque sed aliquam mauris. Praesent posuere eu ligula non dapibus. Curabitur dui lectus, iaculis vel viverra in, pellentesque a tellus. Phasellus maximus, odio sit amet efficitur ultricies, tellus felis suscipit arcu, id ullamcorper quam magna id urna. Suspendisse et consequat orci, et pulvinar ante.
            </Styles.Description>
            <Styles.Tags>
                <Styles.Tag>test</Styles.Tag>
                <Styles.Tag>test2</Styles.Tag>
            </Styles.Tags>
        </Styles.Task>
        )
    }

}