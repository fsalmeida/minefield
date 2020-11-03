import React from 'react';
import './Minefield.css';
import Field from './Field/Field';
const { MinefieldGame } = require('../../js/MinefieldGame')

class Minefield extends React.Component {
    constructor(props) {
        super(props);

        this.minefieldGame = new MinefieldGame(4, 4, '*........*......');
    }

    onToggle(line, column) {
        let toggleResult = this.minefieldGame.toggle(line, column);

        this.setState({
            minefieldGame: this.minefieldGame
        })

        if (toggleResult.hasExploded) {
            alert("Você explodiu!");
        }
        else if (toggleResult.isWinner)
            alert("Você ganhou!");
    }

    render() {
        return <div className="minefield">

            {
                this.minefieldGame.endOfGame ?
                    (<div>Acabou</div>)
                    : ''
            }

            {
                this.minefieldGame.field.map((minefieldRow, lineIndex) => {
                    const minefieldRowItems = minefieldRow.map((field, columnIndex) => {
                        return <Field key={`${lineIndex}-${columnIndex}`} field={field}
                            disabled={this.minefieldGame.endOfGame} onToggle={() => this.onToggle(lineIndex, columnIndex)}>
                        </Field>
                    });

                    return (
                        <div className="minefield-row">
                            {minefieldRowItems}
                        </div>
                    );
                })
            }
        </div >
    }
}

export default Minefield