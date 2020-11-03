const { MinefieldGame, BOMB_SYMBOL } = require('./MinefieldGame')

const validateNumberOfBombs = (lines, columns, numberOfBombs) => {
    const numberOfFieldItems = lines * columns;

    if (numberOfBombs >= numberOfFieldItems)
        throw "Número de bombas deve ser menor que o número de campos";

    return numberOfFieldItems;
}

const placeBombsIntoBomblessFieldString = (bomblessFieldString, numberOfBombs) => {
    let field = bomblessFieldString;

    for (let bombIndex = 0; bombIndex < numberOfBombs; bombIndex++) {
        field = placeBomb(field);
    }

    return field;
}

const placeBomb = (field) => {
    const bombIndex = Math.floor(Math.random() * field.length);
    if (field[bombIndex] == BOMB_SYMBOL)
        return placeBomb(field);


    var fieldAsArray = field.split("");
    fieldAsArray[bombIndex] = BOMB_SYMBOL;
    return fieldAsArray.join("");
}

class MinefieldGameGenerator {
    constructor() {

    }

    generateNewGame(lines, columns, numberOfBombs) {
        const numberOfFieldItems = validateNumberOfBombs(lines, columns, numberOfBombs);
        let bomblessFieldString = '.'.repeat(numberOfFieldItems);
        let fieldString = placeBombsIntoBomblessFieldString(bomblessFieldString, numberOfBombs);
        return new MinefieldGame(lines, columns, fieldString);
    }
}

module.exports = {
    MinefieldGameGenerator
};