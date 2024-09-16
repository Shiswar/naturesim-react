import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Particle, Attractor } from "../../p5/classes";
import { useState, useEffect } from "react";
import SketchButton from "../../components/SketchButton";

var pause: boolean = true;
let rain: Particle[] = [];
let numRain = 200;
let canvasWidth = 1000;
let canvasHeight = 500;
let attractors: Attractor[] = [];
let _p5: P5CanvasInstance;


const setup = () => {
    return () => {
        rain = [] as Particle[];
        attractors = [] as Attractor[];
        pause = true;

        var canvas = _p5.createCanvas(canvasWidth, canvasHeight);
        _p5.background(0);

        for (let i = 0; i < numRain; i++) {
            let xpos = _p5.random(_p5.width);
            let ypos = _p5.random(_p5.height);
            rain.push(new Particle(_p5, xpos, ypos, 6, 3));
        }

        attractors.push(new Attractor(_p5, _p5.width / 5, _p5.height / 6));
        attractors.push(new Attractor(_p5, _p5.width - (_p5.width / 4), _p5.height / 6));
        canvas.mousePressed(mouseClicked());
    }
}
const mouseClicked = () => {
    return () => {
        attractors.push(new Attractor(_p5, _p5.mouseX, _p5.mouseY));
    }
}

const draw = () => {
    return () => {
        for (let attractor of attractors) {
            attractor.show();
        }
        if (!pause) {
            _p5.background(0, 155);
            let gravity = _p5.createVector(0, 1);
            for (let i = 0; i < numRain; i++) {

                rain[i].applyForce(gravity);
                rain[i].update();
                rain[i].edges();
                for (let attractor of attractors) {
                    attractor.attract(rain[i]);
                }
                
                

                // Leaving this here in case I decide to do something with the wind

                // if (mouseIsPressed) {
                //   // let wind = createVector(mouseX, mouseY).setMag(1);
                //   stroke(255);
                //   strokeWeight(5);
                //   line(0, 0, mouseX,mouseY);
                //   // rain[i].acc = _p5.Vector.add(wind, rain[i].acc );
                //   // rain[i].acc.setMag(1);
                //   // rain[i].applyForce(wind);
                //   attractor.attract(rain[i]);
                //   attractor.show();
                // }

                rain[i].show();
            }
        }
    }
}

const resetCanvas = () => {
    attractors = [];
    attractors.push(new Attractor(_p5, _p5.width / 5, _p5.height / 6));
    attractors.push(new Attractor(_p5, _p5.width - (_p5.width / 4), _p5.height / 6));
}

const clearCanvas = () => attractors = [];

function sketch(p5: P5CanvasInstance) {
    _p5 = p5;
    _p5.setup = setup();
    _p5.draw = draw();
}


export function Rain() {

    let [rainState, setRain] = useState(rain);
    useEffect(() => {
        
    })

    let [buttonText, setButtonText] = useState(pause ? "Play" : "Pause");
    const handleClick = () => {
        pause = !pause;
        setButtonText(pause ? "Play" : "Pause");
    }
    return <>
        <div className="flex flex-row">
            <div>
                <ReactP5Wrapper sketch={sketch} />;
            </div>
            <div className="flex flex-col">
                {/* <button className="btn bg-orng-500 text-linen-500 m-4" onClick={resetCanvas}>Reset</button> */}
                <SketchButton
                    label="Reset"
                    onClick={resetCanvas}
                />
                <SketchButton
                    label="Clear"
                    onClick={clearCanvas}
                />
                <SketchButton
                    label={buttonText}
                    onClick={handleClick}
                />

            </div>
        </div>
    </>

}