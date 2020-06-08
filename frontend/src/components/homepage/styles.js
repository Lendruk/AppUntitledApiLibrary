import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

`;

export const AuthContainer = styled.div`
    width: 28vw;
    max-width: 425px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    -webkit-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    border-radius: 2px;
    justify-content: space-between;
`;

export const AuthButton = styled.button`
    background: #66635B;
    color: white;
    border-color: #161513;
    border-radius: 4px;
    font-size: 20px;
    height: 35px;
    cursor: pointer;
`;

export const AuthTitle = styled.h4`
    color: #93A8AC;
    font-size: 24px;
`;

export const AuthOptions = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    width: 60%;
    max-width: 200px;
    align-items: center;

`;

export const Signup = styled.a`
    color: blue;
    text-decoration: underline;
    cursor: pointer;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;


`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #4C5760;    
        h1 {
            color: #EAE0D5;
            padding-left: 35px;
            font-weight: bold;
            font-size: 71px;
        }
    `;

export const Copyright = styled.div`
    color: grey;
`;

export const CardContainer = styled.div`

`;

export const Card = styled.div`

`;