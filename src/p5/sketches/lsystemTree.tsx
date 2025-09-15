import { P5CanvasInstance, Sketch, SketchProps, ReactP5Wrapper,  } from "@p5-wrapper/react"; 
import { useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeContext";

type LSystemTreeProps = SketchProps & {
    rotationAngle?: number;
    lsystemString?: string;
    lineLength?: number;
    canvasWidth?: number;
    canvasHeight?: number;
}

const sketch: Sketch<LSystemTreeProps> = p5 => {
    let rotationAngle = 25;
    let lineLength = 8;
    let canvasWidth = 800; //Default width for this sketch
    let canvasHeight = 500; //Default height for this sketch
    let lsystemString = "";
    
    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight);
        p5.background(0);
        p5.angleMode(p5.DEGREES);
        // p5.noLoop();

    };

    p5.updateWithProps = (props: LSystemTreeProps) => {
        if (props.rotationAngle) {
            rotationAngle = props.rotationAngle;       
        }
        if (props.lsystemString) {
            lsystemString = props.lsystemString;
        }
        if (props.lineLength) {
            lineLength = props.lineLength;
        }
        if (props.canvasHeight) {
            canvasHeight = props.canvasHeight;
        }
        if (props.canvasWidth){
            canvasWidth = props.canvasWidth;
        }
    };

    p5.draw = () => {
        p5.background(0);
        p5.translate(p5.width / 2, p5.height);
        p5.stroke(255);
        p5.frameRate(40);

        for(var i=0; i < lsystemString.length; i++){
            const char = lsystemString[i];
            switch(char) {
                case 'F':
                    //forward
                    p5.line(0, 0, 0, -lineLength);
                    p5.translate(0, -lineLength);
                    break;
                case '+':
                    //turn right
                    // p5.rotate(p5.radians(angle));
                    p5.rotate(rotationAngle);
                    break;
                case '-':
                    //turn left
                    // p5.rotate(-p5.radians(angle));
                    p5.rotate(rotationAngle * -1);
                    break;
                case '[':
                    //save state
                    p5.push();
                    break;
                case ']':
                    //restore state
                    p5.pop();
                    break;
                
            }
        }
        // L-system drawing logic goes here
    };
};
    

export function LSystemTree() {
    const { canvasWidth, canvasHeight } = useTheme();
    const [rotationAngle, setRotationAngle] = useState(25);
    const [lSystemString, setLSystemString] = useState("");
    const [iterations, setIterations] = useState(3);
    const [lineLength, setLineLength] = useState(8);

    const rules = {
        // "F": "FF+[+F-F-F]-[-F+F+F]",
        // "F": "FF[++F][--F]",
        // "F": "FF[+F+F][-F-F]",
        // "F": "FF[-F+F-F][F][+F-F+F]",
        "F": lSystemString,
        "+": "+",
        "-": "-",
        "[": "[",
        "]": "]"
    }
    const axiom = "F";
    // const linelength= 4;
    const lsystem = (start: string, rules: any, iterations: number) => {
        let current = start;
        for (let i = 0; i < iterations; i++) {
            let next = "";
            for (let char of current) {
                next += rules[char] || char;
            }
            current = next;
        }
        return current;
    }

    const lsystemString = lsystem(axiom, rules, iterations);

    return <div>
        <ReactP5Wrapper 
            sketch={sketch} 
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            rotationAngle={rotationAngle} 
            lsystemString={lsystemString}
            lineLength={lineLength}
            />
        <div className="w-full flex slidecontainer">
            <label className="w-1/3 mr-5">Rotation Angle</label>
            <div>
                <input
                    type="range" 
                    min="1" 
                    max="180"
                    className="slider"
                    id="myRange" 
                    onChange={(event) => setRotationAngle(+event.target.value)}/>
                <label className="mx-3">{rotationAngle}</label>
            </div>
        </div>
        <div className="w-full flex slidecontainer">
            <label className="w-1/3 mr-5">Size</label>
            <div>
                <input
                    type="range" 
                    min="1" 
                    max="12"
                    className="slider" 
                    onChange={(event) => setLineLength(+event.target.value)}/>
                <label className="mx-3">{lineLength}</label>
            </div>
        </div>
        <div className="w-full flex slidecontainer">
            <label className="w-1/3 mr-5">Iterations</label>
            <div>
                <input 
                    type="range"
                    min="1" 
                    max="8"
                    onChange={(event) => setIterations(+event.target.value) }
                />
                <label className="mx-3">{iterations}</label>
            </div>
        </div>
        <div className="w-full flex slidecontainer">
            <label className="w-1/3 mr-5">L System Key</label>
            
            <input
                type="text"
                className="bg-night"
                onChange={(event) => setLSystemString(event.target.value) }
            />
        </div>
    </div>;
    
}