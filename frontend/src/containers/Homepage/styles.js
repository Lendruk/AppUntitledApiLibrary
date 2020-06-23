import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    z-index: 10;
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
    padding-left: 35px;
    background: #4C5760;    
        h1 {
            color: #EAE0D5;
            
            font-weight: bold;
            font-size: 71px;
        }
    `;

export const Copyright = styled.div`
    color: grey;
`;

export const CardContainer = styled.div`
    display: flex;

`;

export const Card = styled.div`

    &:nth-child(even) {
        margin-top: 100px;
    }

    max-height: 400px;

    background: white;
    margin: 10px 30px;
    border-radius: 2px;  
    -webkit-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    max-width: 350px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5;
    -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
            -o-animation: fadein 1s; /* Opera < 12.1 */
            animation: fadein 1s;

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

`;

export const CardIcon = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: #A09B92;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: -1px 2px 30px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 2px 30px -4px rgba(0,0,0,0.75);
    box-shadow: -1px 2px 30px -4px rgba(0,0,0,0.75);
    span {
        font-size: 70px;
        color: #161314;
    }
`;

export const CardDescription = styled.div`
    font-size: 18px;
    padding-top: 15px;

    span {
        font-weight: bold;
    }
`;

export const Lines = styled.div`
    z-index: 0;
    position: absolute;
    display: flex;
    width: 10%;
    height: 100%;
    right: 0;
    justify-content: space-evenly;

    div {
        opacity: 0.3;
    }

    div:nth-of-type(1) {
        width: 8px;
        height: 100%;
        background: #8CA2A6;
    }

    div:nth-of-type(2) {
        width: 8px;
        height: 100%;
        background: #8CA2A6;
    }

    div:nth-of-type(3) {
        width: 8px;
        height: 100%;
        background: #8CA2A6;
    }
`;