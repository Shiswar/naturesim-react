import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Grid } from "../../p5/layout/grid";
import { BinaryGrid } from "../../p5/classes/binaryGrid";

var curr: BinaryGrid;
var next: BinaryGrid;

const setup = (p5: P5CanvasInstance) => {
    return () => {
        var canvas = p5.createCanvas(1000, 1000);
        p5.frameRate(20);
        p5.background(255);
        curr = new BinaryGrid(p5, 40, 40);
        curr.setup(p5);
        next = curr.copy();
        

    }
}

const draw = (p5: P5CanvasInstance) => {
    return () => {
        next = curr.copy();
        for (let i = 0; i < curr.rows; i++){
            for (let j = 0; j < curr.cols; j++){
                let numNeighbors = curr.countNeighbors(i, j);
                if (curr.grid[i][j] === 0 ){
                    if (numNeighbors === 3){
                        next.setCell(i, j, 1);
                    }
                }
                else{
                    if (numNeighbors < 2 || numNeighbors > 3){
                        next.setCell(i, j, 0);
                    }
                }
            }
        }
        next.draw(p5);
        curr = next.copy();
    }
    
}

const sketch = (p5: P5CanvasInstance) => {
    p5.setup = setup(p5);
    p5.draw = draw(p5);
}

const pause = () => {}

export function GameOfLife() {
    return <ReactP5Wrapper sketch={sketch} />
}

