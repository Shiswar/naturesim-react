import { useCallback, useEffect, useMemo, useState } from "react";
import './styles.css'; // TODO: import styles properly from
import PageWrapper from "../../../components/PageWrapper";
import { useWordService } from "./useWordService";
import { getCommentRange } from "typescript";

const GUESSES = 6;
const GUESS_LENGTH = 5;

interface GuessLineProps {
    guess: string;
    solution: string;
    isFinal: boolean;
}

interface TileProps {
    letter: string;
    status: string;
    variant?: string;
}

export function Wordle() {
    // const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(5));
    const [currentGuess, setCurrentGuess] = useState('');
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState(false);
    const [gamesPlayed, setGamesPlayed] = useState(1);
    const [invalidWord, setInvalidWord] = useState(false);
    const { solution, isLoading, error, isReal } = useWordService(gamesPlayed);


    // Event listeners
    useEffect(() => {
        const onKeyPress = async (event: KeyboardEvent) => {
            if (finished || winner || isLoading) { return; }

            if (event.key === 'Backspace') {
                let newGuess = currentGuess.slice(0, -1);
                setCurrentGuess(newGuess);
            }

            else if (event.key === 'Enter') {
                if (currentGuess.length === GUESS_LENGTH) {
                    if (!await isReal(currentGuess)) {
                        showMessage();
                        return;
                    }
                    let newGuesses = guesses;
                    newGuesses[currentGuessIndex] = currentGuess;
                    setGuesses(newGuesses);
                    if (currentGuess === solution) {
                        setWinner(true);
                        setFinished(true);
                    }

                    setCurrentGuessIndex(currentGuessIndex + 1);
                    setCurrentGuess('');
                    if (currentGuessIndex === GUESSES - 1) {
                        setFinished(true);
                    }

                }
            }

            const isLetter = /^[a-zA-Z]{1}$/.test(event.key);

            if (isLetter && currentGuess.length < GUESS_LENGTH) {
                setCurrentGuess(currentGuess + event.key.toUpperCase());
            }


        }

        window.addEventListener('keydown', onKeyPress);

        const cleanup = () => {
            window.removeEventListener('keydown', onKeyPress);
        }

        return cleanup;
    }, [currentGuess, isLoading, finished, winner])

    // console.log(guesses);

    const showMessage = () => {
        setInvalidWord(true);

        setTimeout(() => {
            setInvalidWord(false);
        }, 2000)
    }


    const guessLines = useMemo(() => {
        let lines = [];
        for (let i = 0; i < GUESSES; i++) {
            const guess = i == currentGuessIndex ? currentGuess : guesses[i];
            lines.push(
                <GuessLine
                    guess={guess ?? ''}
                    solution={solution ?? ''}
                    isFinal={currentGuessIndex > i}
                />
            )
        }
        return lines;
    }, [guesses, currentGuess]);



    return (
        <div className="page">
            <div className="board">
                {guessLines}
            </div>
            <Keyboard />
            {/* <div className="result">
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
            </div> */}
        </div>
    );


}

function GuessLine({ guess, solution, isFinal }: GuessLineProps) {

    let tiles = [];
    let solutionArray = solution.split("");

    for (let i = 0; i < GUESS_LENGTH; i++) {
        console.log(solutionArray);
        let status = 'incorrect';

        // Letter is in solution
        if (solution.includes(guess[i])) {
            // Letter is in the right place
            if (solution[i] === guess[i]) {
                status = 'correct';
            }
            // Letter is in the wrong place, hasnt already been found
            else if (solutionArray.includes(guess[i])) {
                status = 'almost';
            }

            // Remove from array for next iteration
            const letterIndex = solutionArray.findIndex(l => l === guess[i]);
            solutionArray.splice(letterIndex, 1);
        }

        const tileStatus = isFinal ? status : '';
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

function Tile({ letter, status, variant }: TileProps) {
    const className = `tile ${status} ${variant}`;
    return (<div className={className}>{letter}</div>);
}


function Keyboard() {
    const line1 = 'QWERTYUIOP'.split('');
    const line2 = 'ASDFGHJKL'.split('');
    const line3 = 'ZXCVBNM'.split('');

    return <div className="keyboard">
        <KeyboardLine line={line1} />
        <KeyboardLine line={line2} />
        <KeyboardLine line={line3} />
    </div>
}

type KeyboardLineProps = {
    line: string[];
}

function KeyboardLine({ line }: KeyboardLineProps) {
    return <div className="keyboard-line">
        {
            line.map((k) => <Tile key={k} letter={k} status="" variant="tile-small" />)
        }
    </div>
}