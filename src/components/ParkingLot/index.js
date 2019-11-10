import React, {useState} from 'react';
import { MapInteractionCSS } from 'react-map-interaction';


import {Container, Grid, Line} from './style';
import Cell from '../Cell';

export default function ParkingLot() {
    const [scale] = useState(.5);
    const [translation] = useState({x: 4, y: 4});

    const [park] = useState({xsize: 20, ysize: 20});

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
                x: 9,
                y: 10
            }, {
                type: 'st',
                x: 7,
                y: 12
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
            },
            {
                type: 'df',
                x: 4,
                y: 9
            },
            {
                type: 'df',
                x: 3,
                y: 7
            },
            {
                type: 'df',
                x: 7,
                y: 7
            },
            {
                type: 'df',
                x: 8,
                y: 7
            },
            {
                type: 'df',
                x: 9,
                y: 7
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
                        y: i + 1,
                        path: [false, false, false, false]
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
        for(let i=0; i<4; i++){
            let startCell = cellsCopy.filter(c => c.type === 'st')[0];
            if (!startCell) return;

            for(let i2=0; i2<(park.xsize + park.ysize); i2++){                
                const cell = (() => {
                    const directions = cellsCopy.filter(d => 
                        (d.x === startCell.x     && d.y === startCell.y + 1 && d.type === 'path')  ||
                        (d.x === startCell.x + 1 && d.y === startCell.y     && d.type === 'path')  ||
                        (d.x === startCell.x     && d.y === startCell.y - 1 && d.type === 'path')  ||
                        (d.x === startCell.x - 1 && d.y === startCell.y     && d.type === 'path')
                    );

                    for(let x=0; x<i; x++) directions[directions.length-1] = directions.shift();
                    

                    const distances = [];
                    directions.forEach(d => {
                        const sign = {
                            x: Math.sign(x - d.x),
                            y: Math.sign(y - d.y)
                        };

                        d.dist = ((x - d.x) * sign.x) + ((y - d.y) * sign.y);
                        distances.push(d.dist);
                    });

                    return directions.filter(d => d.dist <= Math.min(...distances) && (d.x !== startCell.x || d.y !== startCell.y))[0];
                })();

                cell.path[i] = true;
                cellsCopy[cellsCopy.indexOf(cell)] = cell;
                startCell = cell;

                if(startCell.x === x && startCell.y === y) i2=Infinity;
            }
        }
        setCells(cellsCopy);
    }

    return (
        <Container>
            <MapInteractionCSS scale={scale} translation={translation}>
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
            </MapInteractionCSS>
        </Container>
    );
}
