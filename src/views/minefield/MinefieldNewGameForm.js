import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
const { MinefieldGameGenerator } = require('../../js/MinefieldGameGenerator')

export default function MinefieldPage(props) {
    const [lines, setLines] = useState(8);
    const [columns, setColumns] = useState(8);
    const [bombs, setBombs] = useState(5);
    const onLinesChanged = (e) => setLines(e.target.value);
    const onColumnsChanged = (e) => setColumns(e.target.value);
    const onBombsChanged = (e) => setBombs(e.target.value);
    const handleFormSubmit = (event) => {
        event.preventDefault();

        let minefieldGame = new MinefieldGameGenerator().generateNewGame(lines, columns, bombs);
        props.onNewGame(minefieldGame);
    }

    useEffect(() => {
        let minefieldGame = new MinefieldGameGenerator().generateNewGame(lines, columns, bombs);
        props.onNewGame(minefieldGame);
    }, []);

    return (
        <Form onSubmit={handleFormSubmit}>
            <h2>Novo jogo</h2>
            <div className="row">
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="lines">Linhas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            min="4"
                            max="16"
                            required
                            aria-label="Lines"
                            aria-describedby="lines"
                            value={lines}
                            onChange={onLinesChanged}
                        />
                    </InputGroup>
                </div>
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="columns">Colunas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            min="4"
                            max="16"
                            required
                            aria-label="Columns"
                            aria-describedby="columns"
                            value={columns}
                            onChange={onColumnsChanged}
                        />
                    </InputGroup>
                </div>
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="bombs">Bombas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            min="1"
                            max="20"
                            required
                            aria-label="Bombs"
                            aria-describedby="bombs"
                            value={bombs}
                            onChange={onBombsChanged}
                        />
                    </InputGroup>
                </div>
            </div>
            <Button variant="primary" type="submit">Iniciar novo jogo</Button>
        </Form>
    )
}