import React from 'react';
import * as Styles from './styles';
import { Input } from '../Input';
export class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Styles.HomeContainer>
                    <Styles.AuthContainer>
                        <div>
                            <Styles.AuthTitle>Login</Styles.AuthTitle>
                            <Styles.InputGroup>
                                <Input style={{marginBottom: 10 }} placeholder="Email" label="email"/>
                                <Input type="password" placeholder="Password" label="password"/>
                            </Styles.InputGroup>
                            <Styles.AuthOptions>
                                <Styles.AuthButton>Sign In</Styles.AuthButton>
                                <span>or</span>
                                <Styles.Signup>Sign up</Styles.Signup>
                            </Styles.AuthOptions>
                        </div>
                        <Styles.Copyright>
                            Copyright TT GameStudios 2020
                        </Styles.Copyright>
                    </Styles.AuthContainer>
                    <Styles.InfoContainer>
                        <h1>Scrumer</h1>
                        <Styles.CardContainer>
                            <Styles.Card>
                                test <span class="moon-users"></span>
                            </Styles.Card>
                        </Styles.CardContainer>
                    </Styles.InfoContainer>
            </Styles.HomeContainer>
        );
    }
}