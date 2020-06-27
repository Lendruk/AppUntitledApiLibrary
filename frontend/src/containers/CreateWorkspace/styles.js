import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 70px - 100px);
`;

export const InputContainer = styled.div`
    border: 2px solid #044862;
    border-radius: 2px;
    padding: 15px;
`;

export const Title = styled.h3`
    font-size: 32px;
`;

export const Button = styled.button`
    margin-top: 25px;
    width: 200px;
    height: 75px;
    font-size: 32px;
`;