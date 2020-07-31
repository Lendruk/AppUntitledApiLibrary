import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const User = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

export const UserTable = styled.div`
    border: 1px solid #185C77;
    border-radius: 2px;
`;

export const Roles = styled.div`

`;

export const Role = styled.div`
    background: ${props => props.colour};
    border-radius: 12px;
    color: white;
    padding: 3px 8px;
`;

export const RowLabels = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;

    div {
        font-weight: bold;
        font-size: 18px;
    }
`;

export const SearchInput = styled.input`

`;