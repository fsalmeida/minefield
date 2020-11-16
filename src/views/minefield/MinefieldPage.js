import React, { useState } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Minefield from './../components/minefield/Minefield'
import MinefieldNewGameForm from './MinefieldNewGameForm'

export default function MinefieldPage() {
    const [minefieldGame, setMinefieldGame] = useState(null);
    const onNewGame = (minefieldGame) => setMinefieldGame(minefieldGame);

    return (
        <>
            <Jumbotron>
                <div className="row">
                    <div className="offset-md-2 col-md-8">
                        <MinefieldNewGameForm onNewGame={onNewGame}></MinefieldNewGameForm>
                    </div>
                </div>
            </Jumbotron>
            <Minefield game={minefieldGame}>
            </Minefield>
        </>
    )
}