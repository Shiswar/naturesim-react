import { Children, ReactNode } from "react";
import { Button, Card } from "react-bootstrap";
import { GameOfLife } from "../p5/sketches/gameOfLife";

export interface SketchCardProps {
    children?: ReactNode
}

export function SketchCard({ children , ...props}: SketchCardProps){
    return (<Card >
        {children}
        <Card.Body>
            <Card.Title>Conway's Game of Life</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            
            </Card.Text>
        </Card.Body>
    </Card>);

}