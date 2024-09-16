import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Particle, Attractor } from "../../p5/classes";
import { useState, useEffect } from "react";

let rain: Particle[] = [];
let numRain = 200;
let attractors: Attractor[] = [];


const setup = (p5: P5CanvasInstance) => {
    return () => {
        rain = [] as Particle[];
        attractors = [] as Attractor[];

        var canvas = p5.createCanvas(1000, 500);
        p5.background(0);
        
        for (let i = 0; i < numRain; i++) {
            let xpos = p5.random(p5.width);
            let ypos = p5.random(p5.height);
            rain.push(new Particle(p5, xpos, ypos, 6, 3));
        }
        canvas.mousePressed(mouseClicked(p5));
    }
}
const mouseClicked = (p5: P5CanvasInstance) => {
    return () => {
        attractors.push(new Attractor(p5, p5.mouseX, p5.mouseY));
    }
}

const draw = (p5: P5CanvasInstance) => {
    return () => {
        p5.background(0, 155);
        let gravity = p5.createVector(0, 1);
        for (let i = 0; i < numRain; i++) {

            rain[i].applyForce(gravity);
            rain[i].update();
            rain[i].edges();

            for (let attractor of attractors) {
                attractor.attract(rain[i]);
                attractor.show();
            }

            // if (mouseIsPressed) {
            //   // let wind = createVector(mouseX, mouseY).setMag(1);
            //   stroke(255);
            //   strokeWeight(5);
            //   line(0, 0, mouseX,mouseY);
            //   // rain[i].acc = p5.Vector.add(wind, rain[i].acc );
            //   // rain[i].acc.setMag(1);
            //   // rain[i].applyForce(wind);
            //   attractor.attract(rain[i]);
            //   attractor.show();
            // }

            rain[i].show();
            // console.log(rain.length)
        }
    }
}

const resetCanvas = () => {
    attractors = [];
}

function sketch(p5: P5CanvasInstance) {
    p5.setup = setup(p5);
    p5.draw = draw(p5);
}


export function Rain() {
    
    let [rainState , setRain] = useState(rain);
    useEffect(() => {
        
    })
    return <>
        <div className="flex flex-row">
            <div>
                <ReactP5Wrapper sketch={sketch} />;
            </div>
            <div>
                <button className="btn bg-orng-500 text-linen-500" onClick={resetCanvas}>Reset</button>
            </div>
        </div>
    </>

}