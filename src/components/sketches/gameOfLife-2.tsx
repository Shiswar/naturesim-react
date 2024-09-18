import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Grid } from "../../p5/classes/grid";
import { BinaryGrid } from "../../p5/classes/binaryGrid";
import { useState } from "react";

let pause: boolean;
let state: Uint8Array = new Uint8Array(0);
let gridW = 200;
let gridH = 200;
let canvasW = 1000;
let canvasH = 1000;
let cellW = canvasW / gridW;
let cellH = canvasH / gridH;
let mousePressed = false;
let lastCell = [-1, -1];
let framesPerDraw = 6;
let framesSinceDraw = 0;
let drawMode = 0; // 1 if setting cells on, 0 if turning cells off

const initArray = () => {
    // array has a border of blank cells to make math consistent when accessing neighbors
    state = new Uint8Array((gridW + 2) * (gridH + 2));

    for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
            let i = x + 1 + ((y + 1) * (gridH + 2));
            state[i] = Math.floor(Math.random() * 2);
        }
    }
}

const getMouseCell = (p5: P5CanvasInstance) => {
    const x = Math.floor(p5.mouseX / cellW);
    const y = Math.floor(p5.mouseY / cellH);
    const i = x + 1 + ((y + 1) * (gridH + 2));
    return [x, y, i];
};

const sketch = (p5: P5CanvasInstance) => {

    p5.setup = () => {
        var canvas = p5.createCanvas(canvasW, canvasH);
        framesSinceDraw = 0;
        lastCell = [-1, -1];
        p5.frameRate(60);
        p5.background(0);
        initArray();
        canvas.mousePressed(() => {
            const [,,i] = getMouseCell(p5);
            drawMode = state[i] === 1 ? 0 : 1;
            lastCell = [-1, -1];
            mousePressed = true;
        });
        canvas.mouseReleased(() => {
            lastCell = [-1, -1];
            mousePressed = false;
        });
    }

    p5.draw = () => {
        p5.fill(0);
        p5.rect(0, 0, canvasW, canvasH);
        p5.fill(255);
        p5.stroke(0);

        if (mousePressed) {
            const [x, y, i] = getMouseCell(p5);
            if (x !== lastCell[0] || y !== lastCell[1]) {
                lastCell = [x, y];
                state[i] = drawMode;
            }
        }

        if (!pause && framesSinceDraw === 0) {
            const newState = new Uint8Array((gridW + 2) * (gridH + 2));
            for (let y = 0; y < gridH; y++) {
                for (let x = 0; x < gridW; x++) {
                    let i = x + 1 + ((y + 1) * (gridH + 2));
                    const ll = state[i - 1];
                    const lu = state[i - gridW - 3];
                    const uu = state[i - gridW - 2];
                    const ru = state[i - gridW - 1];
                    const rr = state[i + 1];
                    const rd = state[i + gridW + 3];
                    const dd = state[i + gridW + 2];
                    const ld = state[i + gridW + 1];
                    const neighbors = ll + lu + uu + ru + rr + rd + dd + ld;
                    const isLive = neighbors === 3 || (neighbors === 2 && state[i] === 1);
                    if (isLive) {
                        newState[i] = 1;
                    }
                }
            }
            state = newState;
        }

        framesSinceDraw += 1;
        if (framesSinceDraw >= framesPerDraw) framesSinceDraw = 0;

        for (let y = 0; y < gridH; y++) {
            for (let x = 0; x < gridW; x++) {
                if (state[x + 1 + ((y + 1) * (gridH + 2))] === 1) {
                    p5.rect(x * cellW, y * cellH, cellW, cellH);
                }
            }
        }
    };
}

export function GameOfLife2() {
    let [buttonText, setButtonText] = useState(pause ? "Play" : "Pause");

    const handleClick = () => {
        pause = !pause;
        setButtonText(pause ? "Play" : "Pause");
    }

    return <>
        <ReactP5Wrapper sketch={sketch} />
        <button onClick={() => handleClick()}>{buttonText}</button>
        <button onClick={() => initArray()}>Clear</button>
    </>
}

