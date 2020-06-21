import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 100%;
    display: flex;
    background: white;
    color: #4C5760;
    font-size: 18px;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid #4C5760;
`;

export const Workspaces = styled.div`
    border-right: 1px solid black;
    max-height: 600px;
    overflow-y: auto;

    span {
        font-weight: bold;
        padding: 15px 20px;
        margin-left: 0px;
    }
`;

export const WorkspaceOption = styled.div`
        border-left: 3px solid ${props => props.selected ? "#4C5760" : "transparent"};
        font-weight: ${props => props.selected ? "bold" : "" };
        background: ${props => props.selected ? "#C5D1D3" : "" };
        padding: 15px 20px;
        &:hover {
            border-left: 3px solid ${props => props.selected ? "#4C5760" : "#C5D1D3"};
        }
`;

export const Projects = styled.div`
    span {
        font-weight: bold;
    }   
`;

export const ProjectOption = styled.div`
    padding: 15px 20px;
    display: flex;
    align-items: center;
    
    .updated-text {
        margin-left: 20px;
        font-size: 12px;
        width: max-content;
        display: inline;
    }
`;
