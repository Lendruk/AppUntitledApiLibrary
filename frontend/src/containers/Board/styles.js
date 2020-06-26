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

export const AddTask = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
    span {
        cursor: pointer;
        margin: 0 15px;
        padding: 5px;
        border-radius: 50%;
        border: 1px solid #044862;
        transition: 0.2s;
        &:hover {
            color: white;
            background: #044862;
            transition: 0.2s;
        }
    }
    div {
        padding-top: 8px;
        height: 1px;
        width: 120px;
        border-bottom: 1px solid #044862;
    }
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

export const ModalContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
    min-width: 600px;
    max-width: 70vw;
`;

export const TaskTitle = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 24px;

    span { 
        font-size: 16px;
        transition: 0.3s;
        margin-left: 10px;
        color: gray;
        display: none;
    }
`;

export const TaskDescription = styled.textarea`
    border: 1px solid lightgrey;
    border-radius: 2px;
    background: #f2f2f2;
    color: ${props => props.textColour};
    padding: 5px;
`;

export const TaskContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    flex: 1;
`;

export const TaskActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: 1px solid #044862;
    padding: 15px 10px;
`;

export const TaskAction = styled.div`
    span {

        &:hover {
            cursor: pointer;
        }
    }
`;

export const TaskTags = styled.div`
    display: flex;
    margin: 10px 0px;
`;

export const Tag = styled.div`
    background: ${props => props.colour};
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
`;

export const HorizontalSeparator = styled.hr`
    flex: 1;
    width: 100%;
    color: #044862;
`;

export const Comments = styled.div`

`;

export const SubTitle = styled.div`
    margin-top: 0px;
    font-size: 1.5em;
`;

export const TitleInput = styled.input`
    margin-bottom: 10px;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 24px;

    border: none;
`;