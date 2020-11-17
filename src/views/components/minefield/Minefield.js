import React, { useEffect, useState } from 'react'
import './Minefield.css';
import Field from './Field/Field';

export default function Minefield(props) {
    const [markingBombState, setMarkingBombState] = useState(false);
    const [markedBombs, setMarkedBombs] = useState([]);
    const [game, setGame] = useState(null)
    const [gameState, setGameState] = useState(null)
    const targetKey = 'Control';

    function downHandler({ key }) {
        if (key === targetKey) {
            setMarkingBombState(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setMarkingBombState(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    useEffect(() => {
        setGame(props.game);
        setGameState(getGameState(props.game))
    }, [props.game])

    const getGameState = (game) => {
        return JSON.parse(JSON.stringify(game));
    }

    const onToggle = (line, column) => {
        if (markingBombState) {
            markBomb(line, column)
        }
        else {
            gameToggle(line, column)
        }
    }

    const markBomb = (line, column) => {
        const fieldKey = `${line}-${column}`;
        const mark = markedBombs.find(x => x == fieldKey);

        if (mark) {
            let newMarks = markedBombs.filter(x => x != fieldKey)
            setMarkedBombs(newMarks)
        }
        else {
            let newMarks = [...markedBombs, fieldKey]
            setMarkedBombs(newMarks)
        }
    }

    const gameToggle = (line, column) => {
        const toggleResult = game.toggle(line, column);
        setGameState(getGameState(game))

        if (toggleResult.hasExploded) {
            setTimeout(() => alert("Você explodiu!"), 100);
        }
        else if (toggleResult.isWinner)
            setTimeout(() => alert("Parabéns, você ganhou!"), 100);
    }

    const isFieldMarkedAsBomb = (line, column) => {
        const fieldKey = `${line}-${column}`;
        return !!markedBombs.find(x => x == fieldKey);
    }

    if (!gameState)
        return <></>

    return (
        <div className="minefield">
            {(`Movimentos: ${gameState.movements}`)}
            {
                gameState.field.map((minefieldRow, lineIndex) => {
                    const minefieldRowItems = minefieldRow.map((field, columnIndex) => {
                        return <Field key={`${lineIndex}-${columnIndex}`} field={field}
                            isMarkingBomb={markingBombState}
                            isMarkedAsBomb={isFieldMarkedAsBomb(lineIndex, columnIndex)}
                            disabled={gameState.endOfGame}
                            onToggle={() => onToggle(lineIndex, columnIndex)}>
                        </Field>
                    });

                    return (
                        <div key={lineIndex} className="minefield-row">
                            {minefieldRowItems}
                        </div>
                    );
                })
            }
        </div >
    )
}