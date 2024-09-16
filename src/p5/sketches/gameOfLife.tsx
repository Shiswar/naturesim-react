import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { BinaryGrid } from "../../p5/classes/binaryGrid";
import { useState } from "react";
import SketchButton from "../../components/SketchButton";

var curr: BinaryGrid;
var next: BinaryGrid;
var pause: boolean = true;
let canvasWidth = 800;
let canvasHeight = 500;
let _p5: P5CanvasInstance;

const setup = () => {
    return () => {
        var canvas = _p5.createCanvas(canvasWidth, canvasHeight);
        pause = true;
        // p5.frameRate(60);
        _p5.background(255);
        curr = new BinaryGrid(_p5, 200, 200);
        curr.setup(_p5);
        next = curr.copy();

        canvas.mousePressed(fillCell(_p5))
        curr.draw(_p5);

    }
}

const draw = () => {
    return () => {
        
        if (!pause) {
            next = curr.copy();
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
            next.draw(_p5);
            curr = next.copy();
        };
    }
    
}

const fillCell = (_p5: P5CanvasInstance) => {
    return () => {
        const cellX = Math.floor(_p5.mouseX / curr.cellWidth);
        const cellY = Math.floor(_p5.mouseY / curr.cellHeight);
        curr.setCell(cellY, cellX, 1);
    }
}

const sketch = (p5: P5CanvasInstance) => {
    _p5 = p5;
    _p5.setup = setup();
    _p5.draw = draw();
}


export function GameOfLife() {
    let [buttonText, setButtonText] = useState(pause ? "Play" : "Pause");

    const handleClick = () => {
        pause = !pause;
        setButtonText(pause ? "Play" : "Pause");
    }

    const clearGrid = () => {
        curr.clear();
    }

    const reset = () => {
        curr.randomize(_p5);
    }
    return <>
    <div className="flex flex-row">
            <div>
                <ReactP5Wrapper sketch={sketch} />;
            </div>
            <div className="flex flex-col">
                {/* <button className="btn bg-orng-500 text-linen-500 m-4" onClick={resetCanvas}>Reset</button> */}
                <SketchButton
                    label={"Randomize"}
                    onClick={reset}
                />
                <SketchButton
                    label="Clear"
                    onClick={clearGrid}
                />
                <SketchButton
                    label={buttonText}
                    onClick={handleClick}
                />

            </div>
        </div>
    </>

}

