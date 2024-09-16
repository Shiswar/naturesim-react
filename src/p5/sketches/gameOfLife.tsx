import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Grid } from "../../p5/classes/grid";
import { BinaryGrid } from "../../p5/classes/binaryGrid";
import { useState } from "react";

var curr: BinaryGrid;
var next: BinaryGrid;
var pause: boolean;

const setup = (p5: P5CanvasInstance) => {
    return () => {
        var canvas = p5.createCanvas(600, 600);
        pause = false;
        // p5.frameRate(60);
        p5.background(255);
        curr = new BinaryGrid(p5, 200, 200);
        curr.setup(p5);
        next = curr.copy();

        canvas.mousePressed(fillCell(p5))
        curr.draw(p5);

    }
}

const draw = (p5: P5CanvasInstance) => {
    return () => {
        next = curr.copy();
        if (!pause) {

            for (let i = 0; i < curr.cols; i++){
                for (let j = 0; j < curr.rows; j++){
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
        };
        next.draw(p5);
        curr = next.copy();
    }
    
}

const fillCell = (p5: P5CanvasInstance) => {
    return () => {
        const cellX = Math.floor(p5.mouseX / curr.cellWidth);
        const cellY = Math.floor(p5.mouseY / curr.cellHeight);
        curr.setCell(cellY, cellX, 1);
    }
}

const sketch = (p5: P5CanvasInstance) => {
    p5.setup = setup(p5);
    p5.draw = draw(p5);
}


export function GameOfLife() {
    let [buttonText, setButtonText] = useState("Pause");

    const handleClick = () => {
        pause = !pause;
        setButtonText(pause ? "Play" : "Pause");
    }

    const clearGrid = () => {
        curr.clear();
    }
    return <>
        <ReactP5Wrapper sketch={sketch} />
        <button onClick={() => handleClick()}>{buttonText}</button>
        <button onClick={() => clearGrid()}>Clear</button>
    </>

}

