import styled from 'styled-components';

const size = '532px';

export const Container = styled.div`
    width: ${size};
    height: ${size};
    position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
    overflow: auto;
`;

export const Grid =  styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
`;

export const Line = styled.div`
    display: flex;
`;