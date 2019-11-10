import React from 'react';
import {Container, Arrow} from './style';

export default function Cell({cellData, findPath}) {
  if(cellData) {
    const {type, status, path} = cellData;
    const bg = {nm: 'darkgreen', id: 'darkblue', df: 'darkred', st: 'orange', path: 'transparent'};

    return(
      <Container bg={bg[type]} onClick={() => findPath()}>
        <span>{type}</span>
        {path && (<Arrow path={path}/>)}
      </Container>
    )

  } 
  
  return <Container/>
}