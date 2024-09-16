import { P5CanvasInstance } from "@p5-wrapper/react";

export class Grid{
    public cols: number;
    public rows: number;
    public cellHeight: number;
    public cellWidth: number;
    public res: number;
    public grid: any[][];
    public p5: P5CanvasInstance;

    constructor(p5: P5CanvasInstance, rows: number, cols: number){
        this.cols = cols;
        this.rows = rows;
        this.cellHeight = Math.floor(p5.height / rows);
        this.cellWidth = Math.floor(p5.width / cols);
        this.p5 = p5;
        this.res = 100;
        this.grid = Array(rows).fill(0).map(x => Array(cols).fill(0));
    }

    setup(p5: P5CanvasInstance){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.grid[i][j] = Math.floor(p5.random(2));
            }
        }
    }

    draw(p5: P5CanvasInstance){
        p5.fill(0);
        p5.rect(0, 0, p5.width, p5.height);
        p5.fill(255);
        p5.stroke(0);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if(this.grid[i][j] > 0){
                    let x =  j * this.cellWidth;
                    let y = i * this.cellHeight;
                    p5.rect(x, y, this.cellWidth, this.cellHeight);
                }
            }
        }
    }

    clear(){
        this.grid = Array(this.rows).fill(0).map(x => Array(this.cols).fill(0));
    }
}
