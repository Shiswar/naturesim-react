import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { Particle, Attractor } from "../../p5/classes";
import { useState, useEffect, useMemo } from "react";
import SketchButton from "../../components/SketchButton";
import { useTheme } from "../../theme/ThemeContext";
import { CustomSketchProps } from "../sketchTypes";
import { Vector } from "p5";

type RainProps = CustomSketchProps & {
    attractors?: Attractor[];
    particles?: Particle[];
    attractionStrength?: number;
    particleCount?: number;
    paused?: boolean;
}

const sketch: Sketch<RainProps> = p5 => {
    let attractors: Attractor[] = [];
    let particles: Particle[] =[];
    let attractionStrength = 0
    let particleCount = 50;
    let paused = false;
    let canvasWidth = 800; //Default width for this sketch
    let canvasHeight = 500; //Default height for this sketch

    const mouseClicked = () => {
        return () => {
            attractors.push(new Attractor(p5, p5.mouseX, p5.mouseY));
        }
    };

    const resetCanvas = () => {
        attractors = [];
        attractors.push(new Attractor(p5, p5.width / 5, p5.height / 6));
        attractors.push(new Attractor(p5, p5.width - (p5.width / 4), p5.height / 6));
    }

    const clearCanvas = () => attractors = [];

    p5.setup = () => {
        var canvas = p5.createCanvas(canvasWidth, canvasHeight);
        p5.background(0);

        for (let i = 0; i < particleCount; i++) {
            let xpos = p5.random(p5.width);
            let ypos = p5.random(p5.height);
            particles.push(new Particle(p5, xpos, ypos, 6, 3));
        }

        attractors.push(new Attractor(p5, p5.width / 5, p5.height / 6));
        attractors.push(new Attractor(p5, p5.width - (p5.width / 4), p5.height / 6));
        // canvas.mousePressed(mouseClicked());
    };

    p5.updateWithProps = (props: RainProps) => {
        if (props.attractionStrength){
            attractionStrength = props.attractionStrength;
        }
        if (props.attractors){
            attractors = props.attractors;
        }
        if (props.particles){
            particles = props.particles;
        }
        if (props.particleCount){
            particleCount = props.particleCount;
        }
        if (props.paused){
            paused = props.paused;
        }
    }

    p5.draw = () => {
        for (let attractor of attractors) {
            attractor.show();
        }
        if (!paused) {
            p5.background(0, 155);
            // let gravity = p5.createVector(0, 1);
            // for (let i = 0; i < particleCount; i++) {
            for (let particle of particles){

                // particles[i].applyForce(gravity);
                // particles[i].update();
                particle.update()

                // particles[i].edges();
                particle.edges();

                let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
                // let attraction = Vector.sub(mousePos, particles[i].pos);
                let attraction = Vector.sub(mousePos, particle.pos);
                attraction.setMag(0.2);
                // particles[i].applyForce(attraction);
                particle.applyForce(attraction);
                // for (let attractor of attractors) {
                //     // Mouse position vector
                //     // attractor.attract(particles[i]);
                // }

                // Leaving this here in case I decide to do something with the wind

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

                // particles[i].show();
                particle.show()
            }
        }
    }

}

export function Rain() {

    const { canvasWidth, canvasHeight } = useTheme();
    const [attractionStrength, setAttractionStrength] = useState(1);
    const [attractors, setAttractors] = useState<Attractor[]>([]);
    const [particleCount, setParticleCount] = useState(100);
    const [paused, setPaused] = useState(false);

    const pauseButtonText = useMemo(() => {
        return paused ? "Play" : "Pause";
    }, [paused])
    
    const handleClick = () => {
        setPaused(!paused);
    }

    // const resetCanvas = () => {
    //     let newAttractors = [];
    //     newAttractors.push(new Attractor(p5, p5.width / 5, p5.height / 6));
    //     newAttractors.push(new Attractor(p5, p5.width - (p5.width / 4), p5.height / 6));
    // }

    const clearCanvas = () => {
        setAttractors([]);
    }

    //TODO: Use icons for pause play and clear
    return <>
        <div className="flex flex-row">
            <div>
                <ReactP5Wrapper 
                    sketch={sketch} 
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    attractors={attractors}
                    attractionStrength={attractionStrength}
                    particleCount={particleCount}
                    />
            </div>
            <div className="flex flex-col">
                {/* <button className="btn bg-orng-500 text-linen-500 m-4" onClick={resetCanvas}>Reset</button> */}
                {/* <SketchButton
                    label="Reset"
                    onClick={resetCanvas}
                /> */}
                <SketchButton
                    label="Clear"
                    onClick={clearCanvas}
                />
                <SketchButton
                    label={pauseButtonText}
                    onClick={handleClick}
                />

            </div>
        </div>
    </>

}