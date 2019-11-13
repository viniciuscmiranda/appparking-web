import React from 'react';
import {Container, Arrow} from './style';

export default function Cell({cellData, findPath}) {
    if (cellData) {
        const {type, status, path} = cellData;
        const baseSrc = '../../../assets/images/';

        const colors = {
            'oc': 'red',
            'vg': 'green',
            'st': 'orange',
            'ou': 'darkgray'
        }

        const foregrounds = {
            'id': 'idoso.png',
            'df': 'deficiente.png',
            'nm': 'normal.png',
        };

        return (
            <Container color={colors[status]} onClick={() => findPath()}>
              {type && <img src={baseSrc + '/' + foregrounds[type]}/>}
              {path && path.active && <Arrow path={path} />}
            </Container>
        )
    }

    return <Container/>
}