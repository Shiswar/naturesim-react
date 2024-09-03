import { P5CanvasInstance  } from "@p5-wrapper/react";
import { Vector } from "p5";

export class Attractor{
    public pos: Vector;
    public r: number;
    public strength: number;
    public p5: P5CanvasInstance;

    constructor(p5: P5CanvasInstance, x:number, y: number){
        this.p5 = p5;
        this.pos = p5.createVector(x, y);
        this.r = 10;
        this.strength = 1;
    }
    
    attract(obj: any){
        let attraction = Vector.sub(this.pos, obj.pos )
        attraction.setMag(1);
        obj.applyForce(attraction);
    }
    
    show(){
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.fill(255);
        this.p5.circle(this.pos.x, this.pos.y, this.r);
    }
  }