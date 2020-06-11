import styled from 'styled-components';

export const Container = styled.div`
    background: #4C5760;
    min-width: 13%;
    display: flex;
    align-items: center;
    flex-direction: column;
    -webkit-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
`;

export const SidebarOption = styled.div`
    padding: 10px 0px;
    font-size: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    user-select: none;

    div {
        padding: 0px 20px;
    }

    span {
        margin-right: 20px;
    }

    &:hover {
        background: #D7CEB2;
    }
`;