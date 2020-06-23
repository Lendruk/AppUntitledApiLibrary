import styled from 'styled-components';

export const Container = styled.div`
    background: #185C77;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
`;

export const Icon = styled.div`
    font-size: 24px;
    border: 1px solid #1B1F22;
    background: #64727D;
    border-radius: 3px;
    color: white;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background: #D7CEB2;
        color: #4C5760;
    }
`;

export const Breadcrumb = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    .breadcrumb-arrow {
        margin: 0px 20px;
        transform: rotateY(180deg)
    }
`;

export const UserOptions = styled.div`
    display: flex;
    padding-right: 20px;
    color: #185C77;
    .userProfile {
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: white;

        span {
            font-size: 28px;
        }
    }
`;

export const ProjectSelector = styled.div`
    display: flex;
    background: #64727D;
    border: 1px solid #1B1F22;
    border-radius: 3px;
    padding: 10px;
    color: white;
    min-width: 200px;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    span {
        transform: rotateZ(270deg);
        margin-left: 15px;
    }
`;