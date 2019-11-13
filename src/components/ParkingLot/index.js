import React, {useState} from 'react';
import {MapInteractionCSS} from 'react-map-interaction';

import {Container, Grid, Line} from './style';
import Cell from '../Cell';

export default function ParkingLot() {
    const [scale] = useState(1);
    const [translation] = useState({x: 1, y: 1});
    const [park] = useState({xsize: 10, ysize: 10});
    function getInitialCells() {
        let data = [
            {
                status: 'oc',
                type: 'id',
                lot_x: 2,
                lot_y: 3
            }, {
                status: 'st',
                lot_x: 1,
                lot_y: 1
            },{
                status: 'oc',
                type: 'id',
                lot_x: 3,
                lot_y: 3
            },{
                status: 'oc',
                type: 'id',
                lot_x: 3,
                lot_y: 4
            },{
                status: 'oc',
                type: 'id',
                lot_x: 2,
                lot_y: 4
            },{
                status: 'oc',
                type: 'id',
                lot_x: 6,
                lot_y: 3
            },{
                status: 'oc',
                type: 'id',
                lot_x: 3,
                lot_y: 2
            },{
                status: 'vg',
                type: 'id',
                lot_x: 4,
                lot_y: 2
            },{
                status: 'vg',
                type: 'id',
                lot_x: 4,
                lot_y: 4
            },{
                status: 'vg',
                type: 'id',
                lot_x: 5,
                lot_y: 5
            },
        ];

        let pathCells = [];
        for (let i = 0; i < park.ysize; i++) {
            for (let i2 = 0; i2 < park.xsize; i2++) {
                const cell = data.filter(c => {
                    return c.lot_x === i2 + 1 && c.lot_y === i + 1
                })[0];

                if (!cell) 
                    pathCells.push({
                        path: {active: false, passed: []},
                        lot_x: i2 + 1,
                        lot_y: i + 1
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
    const findPath = ({lot_x: x, lot_y: y}) => {
        const cellsCopy = getInitialCells().slice(); 
        if(!cellsCopy.filter(c => c.lot_x === x && c.lot_y === y && !c.path)[0]) {
            setCells(getInitialCells());
            return;
        }
        
        let realPath = [[],[],[],[]];
        for (let i = 0; i < 4; i++) {
            let startCell = cellsCopy.filter(c => c.status === 'st')[0];
            
            for (let i2 = 0; i2 < (park.xsize + park.ysize); i2++) {
                const cell = (() => {
                    const directions = cellsCopy.filter(d => 
                        (d.lot_x === startCell.lot_x        && d.lot_y === startCell.lot_y + 1  && d.path) ||
                        (d.lot_x === startCell.lot_x + 1    && d.lot_y === startCell.lot_y      && d.path) ||
                        (d.lot_x === startCell.lot_x        && d.lot_y === startCell.lot_y - 1  && d.path) ||
                        (d.lot_x === startCell.lot_x - 1    && d.lot_y === startCell.lot_y      && d.path)
                    );

                    for (let x = 0; x < i; x++) directions[directions.length - 1] = directions.shift();
                    
                    const distances = [];
                    directions.forEach(d => {
                        const sign = {
                            x: Math.sign(x - d.lot_x),
                            y: Math.sign(y - d.lot_y)
                        };

                        d.dist = ((x - d.lot_x) * sign.x) + ((y - d.lot_y) * sign.y);
                        distances.push(d.dist);
                    });

                    return (()=>{
                        const newCell = directions.sort((a,b) => {
                            return a.dist > b.dist ? a : b;
                        })
                        console.log(newCell);
                        
                        //if(newCell.path.passed.filter(f => f.lot_x === newCell.lot_x && f.lot_y === newCell.lot_y )){
                            
                            
                        //}
                        return directions.filter(d => d.dist <= Math.min(...distances))[0];
                    })();
                })();
                
                realPath[i].push(cell);                
                if (cell.dist <= 1){                         
                        i2 = Infinity;
                        cell.path.found=true;
                }
                cell.path.passed.push({lot_x: cell.lot_x, lot_y: cell.lot_y});
                startCell = cell;
            }
        }
        
        realPath = realPath.filter(
            arr => arr.filter(
                ce => ce.path.found
            )
        );
        realPath=realPath.filter(arr => arr.length === Math.min(...realPath.map(r => {return r.length})))[0];
        realPath.map(r => r.path.active = true);
        setCells(cellsCopy);
    }

    return (
        <Container>
            <MapInteractionCSS scale={scale} translation={translation}>
                <Grid>
                    {Array
                        .from(Array(park.ysize).keys())
                        .map(i => {
                            return (
                                <Line key={i}>{Array
                                        .from(Array(park.xsize).keys())
                                        .map(i2 => {
                                            
                                            const data = cells.filter(c => {
                                                return c.lot_x === i2 + 1 && c.lot_y === i + 1
                                            })[0];

                                            return <Cell key={i2} cellData={data} findPath={() => findPath(data)}/>
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
