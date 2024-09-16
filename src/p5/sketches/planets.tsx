import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Mover } from "../../p5/classes/mover";
import { Vector} from "p5";

let planets: Mover[];
let numBodies: number;

const setup = (p5:P5CanvasInstance) => {
    return () => {
        var canvas = p5.createCanvas(1200, 500);
        p5.background(0);
        numBodies = 9;
        planets = [] as  Mover[];
        for (let i=0 ; i<numBodies ; i++){
            
            let mover = new Mover(p5, p5.random(p5.width), p5.random(p5.height), 15, 20);
            let initial = Vector.sub(mover.pos, Vector.random2D());

            mover.acc = initial;
            console.log(mover.acc);
            planets.push(mover);
        }
    }
}

const draw = (p5:P5CanvasInstance) => {
    return () => {
        p5.background(0, 155);
        for(let planet of planets){
            const otherPlanets = planets.filter(p => p !== planet);
            for (let otherPlanet of otherPlanets){
                planet.attract(otherPlanet);
            }
            planet.update();
            planet.edges();
            planet.show();
        }
    }
}

function sketch(p5: P5CanvasInstance){
    p5.setup = setup(p5);
    p5.draw = draw(p5);
}

export function Planets(){

    return <ReactP5Wrapper sketch={sketch} />
}