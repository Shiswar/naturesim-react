import PageWrapper from "../../components/PageWrapper";
import {  
    Rain,
    Planets,
    GameOfLife,
    LSystemTree
} from "../../p5/sketches";
import { SketchCard } from "../../components/sketchCard";
import { useMemo, useState } from "react";
import SketchButton from "../../components/SketchButton";


export function AllWorks() {
    const [currentSketchIndex, setCurrentSketchIndex] = useState(0);
    // let [sims, setSims] = useState([<Rain />, <Planets/>])


    let sims = [
        {
            sketch: Rain,
            title: "Bees",
            description: "A simulation of particles displaying a gravitational attraction to one or more attractors. Somewhat resembling bees flying around a hive."
        },
        // {
        //     sketch: Planets,
        //     title: "Planets",
        //     description: "A simulation of planets orbiting around each other, demonstrating gravitational attraction and motion in a 2D space."
        // },
        {
            sketch: GameOfLife,
            title: "Conway's Game of Life",
            description: "A cellular automaton devised by the British mathematician John Horton Conway in 1970. It simulates the evolution of a grid of cells based on simple rules."
        },
        {
            sketch: LSystemTree,
            title: 'L-System Tree',
            description: "A simulation of a Lindenmayer system (L-system) that generates fractal-like trees based on a set of rules and an axiom. It visually represents the growth patterns of plants."

        }
    ];

    let sim = useMemo(() => {return sims[currentSketchIndex]}, 
    [currentSketchIndex, sims]);
    

    const nextPage = () => {
        if (currentSketchIndex < sims.length - 1) {
            setCurrentSketchIndex(currentSketchIndex + 1);
        }
    };

    const prevPage = () => {
        if (currentSketchIndex > 0) {
            setCurrentSketchIndex(currentSketchIndex - 1);
        }
    };

    // TODO: Create wim wrapper which contains the sketch, name and description
    // const allSims = () => {
    //     return <SketchCard sketch={sims[currentSketchIndex].sketch()} title={sims[currentSketchIndex].title} description={sims[currentSketchIndex].description} key={sims[currentSketchIndex].title}  />
    //     // return sims.map((s) => {
    //     //     // return <>
    //     //     //     <div className="flex bg-black p-2 m-4">
    //     //     //         <div className="flex flex-row border-b-4 border-orng-500">
    //     //     //             {s.sketch()}
    //     //     //             <h3 className="m-2 text-3xl text-linen-500">{s.name}</h3>
    //     //     //         </div>
    //     //     //     </div>
    //     //     // </>
    //     //     return <SketchCard sketch={s.sketch()} title={s.title} description={s.description} key={s.title}  />
    //     // })
    // }

    return <PageWrapper>
            {/* {allSims()} */}
            <SketchCard sketch={<sim.sketch />} title={sim.title} description={sim.description} key={sim.title}  />
            <SketchButton onClick={prevPage} label={"Prev"} />
            <SketchButton onClick={nextPage} label={"Next"} />
        </PageWrapper>

}