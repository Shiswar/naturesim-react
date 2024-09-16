import { Col, Row } from "react-bootstrap";
import { SketchCard } from "../../components/sketchCard";
import { GameOfLife } from "../../p5/sketches/gameOfLife";
import { Planets } from "../../p5/sketches/planets";
import { Rain } from "../../p5/sketches/rain";
import { useState, useEffect } from "react";

export function AllWorks() {
    // let [sims, setSims] = useState([<Rain />, <Planets/>])

    let sims = [
        {
            sketch: Rain,
            name: "Rain"
        },
        {
            sketch: Planets,
            name: "Planets"
        },
        {
            sketch: GameOfLife,
            name: "Conway's Game of Life"
        }
    ]



    const allSims = () => {
        return sims.map((s) => {
            return <>
                <div className="flex bg-black p-2 m-4">
                    <div className="flex flex-row border-b-4 border-orng-500">
                        {s.sketch()}
                        <h3 className="m-12 text-3xl text-linen-500">{s.name}</h3>
                    </div>
                </div>
            </>
        })
    }

    return <>
            {allSims()}
        </>

}