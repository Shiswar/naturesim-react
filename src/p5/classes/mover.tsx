import { Particle } from "./particle";
import { Vector } from "p5";

import { type P5CanvasInstance } from "@p5-wrapper/react";

export class Mover extends Particle{
    constructor(p5: P5CanvasInstance, x: number, y:number, velMax?: number, radius?: number){
        super(p5, x, y, velMax, radius);
    }

    attract(mover: Mover){
        let force: Vector = Vector.sub(this.pos, mover.pos);
        let distanceSq = this.p5.constrain(force.magSq(), 1, 10);
        let G = 1;
        let strength = (G / distanceSq);
        force.setMag(strength);
        mover.applyForce(force);
    }

    edges(){
        if (this.pos.y >= this.p5.height - this.r
            || this.pos.y <= this.r
        ) {
            this.vel.y *= -1;
        }

        if (
            this.pos.x >= this.p5.width - this.r
            || this.pos.x <= this.r
        ){
            this.vel.x *= -1;
        }
    }

}