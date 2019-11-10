import React from 'react';
import {Container, Arrow} from './style';

export default function Cell({cellData, findPath}) {
  if(cellData) {
    const {type, status, path} = cellData;
    const bg = {nm: 'black', id: 'black', df: 'black', st: 'orange', path: 'transparent'};
    const cs = ['red', 'blue', 'green', 'yellow', 'transparent'];    

    return(
      <Container bg={bg[type]} onClick={() => findPath()}>
        {path && path.map((p,i) => {if(p) return (<Arrow key={i} color={cs[i]}/>); else return (<Arrow key={i} color={cs[cs.length-1]}/>)})}
      </Container>
    )

  } 
  
  return <Container/>
}