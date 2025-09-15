import { useEffect, useMemo, useState } from "react";
import './styles.css'; // TODO: import styles properly from
import PageWrapper from "../../../components/PageWrapper";
import { useWordService } from "./useWordService";
import { getCommentRange } from "typescript";

const GUESSES = 6;
const GUESS_LENGTH = 5;

interface GuessLineProps{
    guess: string;
    solution: string;
    isFinal: boolean;
}

interface TileProps {
    letter: string;
    status : string;
}

export function Wordle(){
    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(5)); 
    const [currentGuess, setCurrentGuess] = useState('');
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState(false);
    const [invalidWord, setInvalidWord] = useState(false);
    const {isReal, getRandomWord, getWordCount, isLoading} = useWordService();

    useEffect(() => {
        // In useEffect here, will move to some sort of fetch function later
        const sol = getRandomWord()?.toUpperCase();
        setSolution(sol ?? '');
        // const wordService = new WordService();
    }, [isLoading])
    

    // Event listeners
    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {

            if (finished || winner){return;}

            if (event.key === 'Backspace'){
                let newGuess = currentGuess.slice(0, -1);
                setCurrentGuess(newGuess);
            }

            else if (event.key === 'Enter'){
                if (currentGuess.length === GUESS_LENGTH){
                    if (!isReal(currentGuess)) {
                        showMessage();
                        return;
                    }
                    let newGuesses = guesses;
                    newGuesses[currentGuessIndex] = currentGuess;
                    setGuesses(newGuesses);
                    if (currentGuess == solution){
                        setWinner(true);
                        setFinished(true);
                    }

                    setCurrentGuessIndex(currentGuessIndex + 1);
                    setCurrentGuess('');
                    if (currentGuessIndex === GUESSES - 1){
                        setFinished(true);
                    }

                }
            }

            const isLetter = /^[a-zA-Z]{1}$/.test(event.key);

            if (isLetter && currentGuess.length < GUESS_LENGTH){
                setCurrentGuess(currentGuess + event.key.toUpperCase());
            }
            

        }

        window.addEventListener('keydown', onKeyPress);

        const cleanup = () => {
            window.removeEventListener('keydown', onKeyPress);
        }

        return cleanup;
    },
    [currentGuess])

    // console.log(guesses);
    
    const showMessage = () => {
        setInvalidWord(true);

        setTimeout(() => {
            setInvalidWord(false);
        }, 2000 )
    } 


    const guessLines = useMemo(() => {
        let lines = [];
        for(let i = 0 ; i < GUESSES ; i++){
            const guess = i == currentGuessIndex ? currentGuess : guesses[i];
            lines.push(
                <GuessLine 
                    guess={guess ?? ''} 
                    solution={solution} 
                    isFinal={currentGuessIndex > i}
                    />
            )
        }
        return lines;
    },[guesses, currentGuess]);



    return (
        <div className="page">
            <div className="board">
                {guessLines}
            </div>
            <div className="result">
                {
                    invalidWord && "That isnt a fucking word"
                }
                { 
                    finished && !winner && "Wrong, the word was " + solution
                }
                {
                    winner && "Correct! Well done"
                }
                {
                    finished && <div>Again</div>
                }
            </div>
        </div>
    );


}

function GuessLine({ guess, solution, isFinal }: GuessLineProps){
    
    let tiles = [];

    for (let i=0 ; i < GUESS_LENGTH ; i++){
        const tileStatus = isFinal ? getTileStatus(guess[i], i, solution) : '' ;
        tiles.push(
            <Tile 
                key={i} 
                letter={guess[i]} 
                status={tileStatus}
                />
        );
    }

    return (
        <div className="guessLine">
            {tiles}
        </div>
    );
        
    
} 

function Tile({ letter, status }: TileProps){
    const className = 'tile ' + status; 
    return (<div className={className}>{letter}</div>);
}

const getTileStatus = (letter: string, index: number, solution: string) => {
        let status = 'incorrect';

        if (solution[index] === letter){
            status = 'correct';
        }

        else if (solution.includes(letter)){
            status = 'almost';
        }

        return status;
    }