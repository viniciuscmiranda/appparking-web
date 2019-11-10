import styled from 'styled-components';

export const Container = styled.button `
  width: 50px;
  height: 50px;
  background: none ${props => props.bg};
  margin: 1px;
  border: 1px rgba(0,0,0,.2) solid;
  position: relative;

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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
`;
