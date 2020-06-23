import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Styles from './styles';
import Register from '../Register';
import Login from '../Login';


class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            isLogin: true,
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

    render() {
        const { cards, isLogin, email } = this.state;

        return (
            <Styles.HomeContainer>
                <Styles.AuthContainer>
                    {isLogin ?
                        <Login email={email} changeAuthMode={(val) => this.setState({ isLogin: val })} /> :
                        <Register changeAuthMode={(val, email) => this.setState({ isLogin: val, email })} />}
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

Homepage.propTypes = {
    login: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    login: state => state.login,
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

export default compose(withConnect)(Homepage);