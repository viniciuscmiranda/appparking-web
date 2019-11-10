import styled from 'styled-components';

export const Container = styled.button `
  width: 50px;
  height: 50px;
  background: none ${props => props.bg};
  margin: 1px;
  border: 1px rgba(0,0,0,.2) solid;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  span{
    position: absolute;
    color: rgba(255,255,255);
    font-family: sans-serif;
    font-size: 24px;
    top: 50%;
    left: 50%;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }
`;

export const Arrow = styled.div`
  width: 50%;
  height: 25px;
  background-color: ${props => props.color};
`;
