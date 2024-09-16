import { GameOfLife } from "../../p5/sketches/gameOfLife";
import { Planets } from "../../p5/sketches/planets";
import { Rain } from "../../p5/sketches/rain";
import { useState, useEffect } from "react";

export function AllWorks(){
    let [sims, setSims] = useState([<Rain />, <Planets/>])

    useEffect(() =>{
        setSims([
            // <Rain />, 
            // <Planets/>, 
            < GameOfLife />])
    }, [])
    
    return <>
        {sims}
    </>
}