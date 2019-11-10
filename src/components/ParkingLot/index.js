import React, {useState} from 'react';

import {Container, Grid, Line} from './style';
import Cell from '../Cell';

export default function ParkingLot() {
    const [park] = useState({xsize: 10, ysize: 10});

    function getInitialCells() {
        let data = [
            {
                type: 'id',
                x: 2,
                y: 2
            }, {
                type: 'id',
                x: 3,
                y: 2
            }, {
                type: 'id',
                x: 10,
                y: 10
            }, {
                type: 'nm',
                x: 1,
                y: 1
            }, {
                type: 'st',
                x: 5,
                y: 5
            },
            {
                type: 'nm',
                x: 5,
                y: 4
            },
            {
                type: 'df',
                x: 2,
                y: 5
            }
        ];

        let pathCells = [];
        for (let i = 0; i < park.ysize; i++) {
            for (let i2 = 0; i2 < park.xsize; i2++) {
                const cell = data.filter(c => {
                    return c.x === i2 + 1 && c.y === i + 1
                })[0];
                if (!cell) 
                    pathCells.push({
                        type: 'path',
                        x: i2 + 1,
                        y: i + 1
                    });
                }
            }

        data = [
            ...data,
            ...pathCells
        ];
        return data;
    }
    const [cells, setCells] = useState(getInitialCells());

    const findPath = ({x, y}) => {
        const cellsCopy = getInitialCells().slice();
        let startCell = cellsCopy.filter(c => c.type === 'st')[0];
        if (!startCell) return;

        let a=0;
        while (a<10 && (startCell.x !== x || startCell.y !== y)){
            a++;
            const cell = (() => {
                const directions = cellsCopy.filter(d => 
                    (d.x === startCell.x     && d.y === startCell.y + 1 && d.type === 'path')  ||
                    (d.x === startCell.x + 1 && d.y === startCell.y     && d.type === 'path')  ||
                    (d.x === startCell.x     && d.y === startCell.y - 1 && d.type === 'path')  ||
                    (d.x === startCell.x - 1 && d.y === startCell.y     && d.type === 'path')
                );
                
                const distances = [];
                directions.forEach(d => {
                    const relsign = {
                        x: Math.sign(x - d.x),
                        y: Math.sign(y - d.y)
                    };

                    d.dist = ((x - d.x) * relsign.x) + ((y - d.y) * relsign.y);
                    distances.push(d.dist);
                });

                return directions.filter(d => d.dist === Math.min(...distances))[0];
            })();

            cell.path = true;
            cellsCopy[cellsCopy.indexOf(cell)] = cell;
            startCell = cell;
        }
        setCells(cellsCopy);
    }

    return (
        <Container>
            <Grid>
                {
                    Array
                        .from(Array(park.ysize).keys())
                        .map(i => {
                            return (
                                <Line key={i}>{
                                        Array
                                            .from(Array(park.xsize).keys())
                                            .map(i2 => {
                                                const data = cells.filter(c => {
                                                    return c.x === i2 + 1 && c.y === i + 1
                                                })[0];

                                                return <Cell
                                                    key={i2}
                                                    cellData={data}
                                                    findPath={() => findPath(data)}/>
                                            })
                                    }</Line>
                            )
                        })
                }
            </Grid>
        </Container>
    );
}
