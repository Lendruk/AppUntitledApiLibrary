import React from 'react';
import * as Styles from './styles';
export class Input extends React.Component {

    render() {
        const { label, value, name, onChange, type, placeholder, style } = this.props;

        return (
            <Styles.Container style={style ? { ...style } : {}}>
                <label>{label}</label>
                <Styles.Input value={value} name={name} placeholder={placeholder} onChange={onChange} type={type} />
            </Styles.Container>
        );
    }

}