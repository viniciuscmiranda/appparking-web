import styled from 'styled-components';

export const Container = styled.button `
  width: 50px;
  height: 50px;
  background: none ${props => props.color};
  margin: 1px;
  border: 1px rgba(0,0,0,.2) solid;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  img{
    position: absolute;
    width: 80%;
    height: 80%;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
  }
`;

export const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(0,0,0,.5);
`;
