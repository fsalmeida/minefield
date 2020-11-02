const BOMB_SYMBOL = '*';

const buildField = (lines, columns, inputField) => {
    let field = splitInputFieldIntoMatrixField(lines, columns, inputField);
    identifyNumberOfBombsOnEachFieldElement(field);

    field = field.map(minefieldRow => {
        return minefieldRow.map(fieldValue => {
            return {
                value: fieldValue,
                isToggled: false,
                isBomb: fieldValue == BOMB_SYMBOL
            };
        })
    });

    return field;
}

const identifyNumberOfBombsOnEachFieldElement = (field) => {
    for (let l = 0; l < field.length; l++) {
        let currentLine = field[l];
        for (let c = 0; c < currentLine.length; c++) {
            let targerElement = currentLine[c];
            let isBomb = targerElement == BOMB_SYMBOL;
            if (isBomb)
                continue;

            let boundaries = findBoundaries(field, l, c);
            let boundariesElements = boundaries.map(boundary => field[boundary.line][boundary.column]);
            let nearbyBombsCount = boundariesElements.filter(elem => elem == BOMB_SYMBOL).length;
            field[l][c] = nearbyBombsCount;
        }
    }
}

const findBoundaries = (field, targetLine, targetColumn) => {
    const initialBoundaryLine = targetLine - 1;
    const finalBoundaryLine = targetLine + 1;
    const initialBoundaryColumn = targetColumn - 1;
    const finalBoundaryColumn = targetColumn + 1;
    let boundaries = [];

    for (let currentLine = initialBoundaryLine; currentLine <= finalBoundaryLine; currentLine++) {
        if (!validateLine(field, currentLine))
            continue;

        for (let currentColumn = initialBoundaryColumn; currentColumn <= finalBoundaryColumn; currentColumn++) {
            if (!validateColumn(field, currentColumn))
                continue;

            let isTargetElement = currentLine == targetLine && currentColumn == targetColumn;
            if (!isTargetElement) {
                boundaries.push({ line: currentLine, column: currentColumn });
            }
        }
    }

    return boundaries;
}

const validateLine = (field, line) => {
    return line >= 0 && line < field.length;
}

const validateColumn = (field, column) => {
    let firstLine = field[0];
    return column >= 0 && column < firstLine.length;
}

const splitInputFieldIntoMatrixField = (lines, columns, inputField) => {
    let fieldElements = inputField.split('');
    let field = [];

    for (let i = 0; i < lines; i++) {
        let initialPosition = i * columns;
        let finalPosition = initialPosition + columns;
        let fieldLine = fieldElements.slice(initialPosition, finalPosition);
        field.push(fieldLine);
    }

    return field;
}

const toggleBoundaries = (field, row, column) => {
    let boundaries = findBoundaries(field, row, column);

    boundaries.forEach(boundary => {
        let fieldItem = field[boundary.line][boundary.column];
        if (!fieldItem.isToggled) {
            fieldItem.isToggled = true;

            if (fieldItem.value == '0') {
                toggleBoundaries(field, boundary.line, boundary.column);
            }
        }
    })
}

class MinefieldGame {
    constructor(lines, columns, inputField) {
        this.lines = lines;
        this.columns = columns;
        this.field = buildField(lines, columns, inputField);
        this.endOfGame = false;
        this.isWinner = false;
    }

    toggle(row, line) {
        let fieldItem = this.field[row][line];
        fieldItem.isToggled = true;

        if (fieldItem.value == BOMB_SYMBOL) {
            this.endOfGame = true;

            return { hasExploded: true, isWinner: false };
        }

        if (fieldItem.value == '0')
            toggleBoundaries(this.field, row, line);

        const missingNonBombsToToggle = this.field
            .flatMap(fieldRow => fieldRow)
            .filter(field => !field.isBomb && !field.isToggled);

        this.isWinner = missingNonBombsToToggle.length == 0;
        this.endOfGame = this.isWinner;
        return { hasExploded: false, isWinner: this.isWinner };
    }
}


module.exports = {
    MinefieldGame
};