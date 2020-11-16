import React, { useEffect, useState } from 'react'
import './Minefield.css';
import Field from './Field/Field';

export default function Minefield(props) {
    const [game, setGame] = useState(null)
    const [gameState, setGameState] = useState(null)

    useEffect(() => {
        setGame(props.game);
        setGameState(getGameState(props.game))
    }, [props.game])

    const getGameState = (game) => {
        return JSON.parse(JSON.stringify(game));
    }

    const onToggle = (line, column) => {
        const toggleResult = game.toggle(line, column);
        setGameState(getGameState(game))

        if (toggleResult.hasExploded) {
            setTimeout(() => alert("Você explodiu!"), 100);
        }
        else if (toggleResult.isWinner)
            setTimeout(() => alert("Parabéns, você ganhou!"), 100);
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
                            disabled={gameState.endOfGame} onToggle={() => onToggle(lineIndex, columnIndex)}>
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