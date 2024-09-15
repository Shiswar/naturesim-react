import { GameOfLife } from "../../components/sketches/gameOfLife";
import { Planets } from "../../components/sketches/planets";
import { Rain } from "../../components/sketches/rain"
import { useState, useEffect } from "react";

export function Works(){
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