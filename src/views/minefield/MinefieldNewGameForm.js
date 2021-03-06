import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
const { MinefieldGameGenerator } = require('../../js/MinefieldGameGenerator')

export default function MinefieldPage(props) {
    const [lines, setLines] = useState(8);
    const [columns, setColumns] = useState(8);
    const [bombs, setBombs] = useState(5);
    const [maxBombs, setMaxBombs] = useState(8 * 8 - 1);
    const [validated, setValidated] = useState(false);

    const onLinesChanged = (e) => {
        const linesValue = parseInt(e.target.value)
        setLines(linesValue)
        updateMaxBombs(linesValue, columns);
    };
    const onColumnsChanged = (e) => {
        const columnsValue = parseInt(e.target.value)
        setColumns(columnsValue)
        updateMaxBombs(lines, columnsValue)
    };
    const onBombsChanged = (e) => setBombs(parseInt(e.target.value));
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            let minefieldGame = new MinefieldGameGenerator().generateNewGame(lines, columns, bombs);
            props.onNewGame(minefieldGame);
        }

        setValidated(true);
    }

    const updateMaxBombs = (linesValue, columnsValue) => {
        let maxBombsValue = 0;
        if (linesValue > 0 && columnsValue > 0)
            maxBombsValue = linesValue * columnsValue - 1;

        console.log(maxBombsValue)
        setMaxBombs(maxBombsValue)
    }

    useEffect(() => {
        let minefieldGame = new MinefieldGameGenerator().generateNewGame(lines, columns, bombs);
        props.onNewGame(minefieldGame);
    }, []);

    return (
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <h2>Novo jogo</h2>
            <div className="row">
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="lines">Linhas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            min="4"
                            max="16"
                            required
                            aria-label="Lines"
                            aria-describedby="lines"
                            value={lines}
                            onChange={onLinesChanged}
                        />
                        <Form.Control.Feedback type="invalid">
                            Insira um valor válido, entre 4 e 16
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="columns">Colunas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            min="4"
                            max="16"
                            required
                            aria-label="Columns"
                            aria-describedby="columns"
                            value={columns}
                            onChange={onColumnsChanged}
                        />
                        <Form.Control.Feedback type="invalid">
                            Insira um valor válido, entre 4 e 16
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>
                <div className="col-md-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="bombs">Bombas</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            min="1"
                            max={maxBombs}
                            required
                            aria-label="Bombs"
                            aria-describedby="bombs"
                            value={bombs}
                            onChange={onBombsChanged}
                        />
                        <Form.Control.Feedback type="invalid">
                            Insira um valor válido, entre 4 e {maxBombs}
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>
            </div>
            <Button variant="primary" type="submit">Iniciar novo jogo</Button>
        </Form>
    )
}