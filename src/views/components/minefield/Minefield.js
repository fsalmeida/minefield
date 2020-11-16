import React from 'react';
import './Minefield.css';
import Field from './Field/Field';
const { MinefieldGameGenerator } = require('../../../js/MinefieldGameGenerator')

class Minefield extends React.Component {
    constructor(props) {
        super(props);

        this.setup = {
            lines: 6,
            columns: 6,
            bombs: 5
        };

        this.newGame();
    }

    onToggle(line, column) {
        const toggleResult = this.minefieldGame.toggle(line, column);

        this.setState({
            minefieldGame: this.minefieldGame
        })

        if (toggleResult.hasExploded) {
            setTimeout(() => alert("Você explodiu!"), 100);
        }
        else if (toggleResult.isWinner)
            setTimeout(() => alert("Parabéns, você ganhou!"), 100);
    }

    newGame() {
        this.minefieldGame = new MinefieldGameGenerator()
            .generateNewGame(this.setup.lines, this.setup.columns, this.setup.bombs);
        this.setState({ minefieldGame: this.minefieldGame })
    }

    render() {
        return (
            <div className="minefield">
                {
                    this.minefieldGame.field.map((minefieldRow, lineIndex) => {
                        const minefieldRowItems = minefieldRow.map((field, columnIndex) => {
                            return <Field key={`${lineIndex}-${columnIndex}`} field={field}
                                disabled={this.minefieldGame.endOfGame} onToggle={() => this.onToggle(lineIndex, columnIndex)}>
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
}

export default Minefield