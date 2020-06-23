import styled from 'styled-components';

export const Board = styled.div`
    display: flex;
    padding: 35px;
    min-height: calc(100vh - 70px - 100px);
`;

export const Column = styled.div`
    display: flex;
    margin: 0 25px;
    flex-direction: column;

    
    border-radius: 3px;
    width: 350px;
    
    border: 1px solid #044862;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ColumnTitleInput = styled.input`
    text-align: center;
    height: 15px;
    width: 80%;
    border-radius: 4px;
    border: 1px solid #044862;
`;

export const ColumnTitle = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    width: 100%;
    background: #598392;
    color: white;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    justify-content: center;
    padding: 10px 0px;
    font-size: 18px;

    .title-value { 
        cursor: pointer;   
    }
`;

export const Tasks = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

export const AddColumn = styled.div`
   min-height: calc(100vh - 70px - 100px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #044862;
        color: white;
        border-radius: 50%;
        height: 50px;
        width: 50px;

        &:hover {
            color: #044862;
            background: white;
            border: 1px solid #044862;
            cursor: pointer;
        }
    }
`;

export const NoTasks = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;