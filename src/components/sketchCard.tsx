import { Children, ReactNode } from "react";
import { Button, Card } from "react-bootstrap";
import { GameOfLife } from "../p5/sketches/gameOfLife";

export interface SketchCardProps {
    sketch: ReactNode
    title: string
    description?: string
    children?: ReactNode
}

export const SketchCard: React.FC<SketchCardProps> = ({ ...props}: SketchCardProps) => {
    return (
    <Card text="light" color="primary" className="m-2 bg-night-100">
        <Card.Title className="m-2">{props.title}</Card.Title>
        <hr />
        <Card.Body className="d-flex">
            {props.sketch}
            <Card.Text>
                {props.description || "No description provided."}
            </Card.Text>
        </Card.Body>
    </Card>);
}