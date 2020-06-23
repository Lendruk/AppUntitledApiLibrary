import styled from 'styled-components';

export const Task = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    border-left: 7px solid ${props => props.color};
    border-top: 7px solid ${props => props.color};
    min-height: 120px;
    max-height: 300px;
    position: relative;
    margin: 5px 10px;

    cursor: grab;
`;

export const Poly = styled.div`
    height: 20px;
    width: 20px;
    position: relative;
    span{
        position: absolute;
        top: 5px;
        left: 5px;
    }
    background: ${props => props.color};
    svg {
        fill: ${props => props.color};;
    }
`;

export const TaskTitle = styled.div`
    margin-left: 40px;
    font-weight: bold;
`;

export const Tags = styled.div`
    margin: 10px 0px;
    padding: 0px 20px;
    display: flex;  
`;

export const Tag = styled.div`
    background: blue;
    color:white;
    padding: 2px 10px;
    margin: 0px 5px;
    border-radius: 15px;
`;

export const Description = styled.div`
    padding: 10px;
    overflow: hidden;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;