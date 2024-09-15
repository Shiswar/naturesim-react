import { P5CanvasInstance } from "@p5-wrapper/react";
import { Grid } from "../layout/grid";

export class BinaryGrid extends Grid{
    constructor(p5: P5CanvasInstance, rows: number, cols: number){
        super(p5, rows, cols);
    }

    public setCell(x: number, y: number, state: number){
        this.grid[x][y] = state;
    }

    public countNeighbors(x: number, y: number){
        let sum = 0;
        for(let i =-1 ; i < 2 ; i++){
            if(x < 1 || x > this.rows - 2) continue;
            for(let j=-1 ; j < 2 ; j++){
                if(y < 1 || y > this.cols - 2) continue;
                sum += this.grid[x + i][y + j];
            }
        }
        sum -= this.grid[x][y];
        return sum;
    }

    copy(){
        let copy = new BinaryGrid(this.p5, this.rows, this.cols)
        copy.grid = this.grid.map(x => x.map(y => y));
        return copy;
    }

}