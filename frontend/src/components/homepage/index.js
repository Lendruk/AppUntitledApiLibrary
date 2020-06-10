import React from 'react';
import * as Styles from './styles';
import { Input } from '../Input';
export class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authMode: "signIn",
            cards: [
                {
                    icon: "moon-users",
                    title: "Card Title",
                    description: " Manage your team Lorem ipsum dolor sit ammet good boost is good boost is good Maecenas turpis diam, auctor nec eleifend vitae, gravida et lacus. Aliquam vel quam elit. Aliquam congue hendrerit urna, ut hendrerit ipsum. Nam dictum posuere metus, lacinia luctus purus elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed tincidunt fermentum magna in ultrices"
                },
                {
                    icon: "moon-cogs",
                    title: "Card Title",
                    description: " Manage your team Lorem ipsum dolor sit ammet good boost is good boost is good Maecenas turpis diam, auctor nec eleifend vitae, gravida et lacus. Aliquam vel quam elit. Aliquam congue hendrerit urna, ut hendrerit ipsum. Nam dictum posuere metus, lacinia luctus purus elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed tincidunt fermentum magna in ultrices"
                },
                {
                    icon: "moon-stats-dots",
                    title: "Card Title",
                    description: " Manage your team Lorem ipsum dolor sit ammet good boost is good boost is good Maecenas turpis diam, auctor nec eleifend vitae, gravida et lacus. Aliquam vel quam elit. Aliquam congue hendrerit urna, ut hendrerit ipsum. Nam dictum posuere metus, lacinia luctus purus elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed tincidunt fermentum magna in ultrices"
                },
                {
                    icon: "moon-stack",
                    title: "Card Title",
                    description: " Manage your team Lorem ipsum dolor sit ammet good boost is good boost is good Maecenas turpis diam, auctor nec eleifend vitae, gravida et lacus. Aliquam vel quam elit. Aliquam congue hendrerit urna, ut hendrerit ipsum. Nam dictum posuere metus, lacinia luctus purus elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed tincidunt fermentum magna in ultrices"
                }
            ]

        };
    }

    renderSignIn() {
        return (
            <div>
                <Styles.AuthTitle>Login</Styles.AuthTitle>
                <Styles.InputGroup>
                    <Input style={{marginBottom: 10 }} placeholder="Email" label="email"/>
                    <Input type="password" placeholder="Password" label="password"/>
                </Styles.InputGroup>
                <Styles.AuthOptions>
                    <Styles.AuthButton>Sign In</Styles.AuthButton>
                    <span>or</span>
                    <Styles.Signup onClick={() => this.setState({ authMode: "signUp"})}>Sign up</Styles.Signup>
                </Styles.AuthOptions>
            </div>
        )
    }

    renderSignUp() {
        return (
            <div>
                <Styles.AuthTitle>Sign Up</Styles.AuthTitle>
                <Styles.InputGroup>
                    <Input style={{marginBottom: 10 }} placeholder="Email" label="email"/>
                    <Input type="password" placeholder="Password" label="password"/>
                </Styles.InputGroup>
                <Styles.AuthOptions>
                    <Styles.AuthButton>Register</Styles.AuthButton>
                    <span>or</span>
                    <Styles.Signup onClick={() => this.setState({ authMode: "signIn" })}>Login</Styles.Signup>
                </Styles.AuthOptions>
            </div>
        )
    }

    render() {
        const { cards, authMode } = this.state;

        return (
            <Styles.HomeContainer>
                    <Styles.AuthContainer>
                        {authMode === 'signIn' ? this.renderSignIn() : this.renderSignUp()}
                        <Styles.Copyright>
                            Copyright TT GameStudios 2020
                        </Styles.Copyright>
                    </Styles.AuthContainer>
                    <Styles.InfoContainer>
                        <h1>Scrumer</h1>
                        <Styles.CardContainer>
                            {cards.map(card => (
                                 <Styles.Card key={`${card.title}-${card.icon}`}>
                                 <Styles.CardIcon>
                                     <span className={card.icon}></span>
                                 </Styles.CardIcon>
                                 <Styles.CardDescription>
                                <span>{card.title}</span>
                                {card.description}
                                </Styles.CardDescription>
                             </Styles.Card>
                            ))}
                        </Styles.CardContainer>
                    </Styles.InfoContainer>
                    <Styles.Lines>
                        <div />
                        <div />
                        <div />
                    </Styles.Lines>
            </Styles.HomeContainer>
        );
    }
}