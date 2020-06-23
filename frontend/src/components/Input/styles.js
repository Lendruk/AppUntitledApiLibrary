import styled from 'styled-components';


export const Input = styled.input`
    border: 1px solid #D7CEB2;
    height: 40px;
    border-radius: 2px;
    padding-left: 10px;

    &:focus {
        border-color: #796A3E;
        transition: 0.15s;
    }   
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 5px;
        font-weight: bold;
    }
`;