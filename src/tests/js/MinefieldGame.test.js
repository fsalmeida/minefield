const { MinefieldGame } = require('../../js/MinefieldGame')

describe('Testes relativos aos campos simples de um campo de 4 por 4', () => {
    let minefieldGame = null;
    beforeEach(() => {
        minefieldGame = new MinefieldGame(4, 4, '*........*......');
    });

    test('O número de linhas deve ser 4', () => {
        expect(minefieldGame.lines).toBe(4);
    });

    test('O número de colunas deve ser 4', () => {
        expect(minefieldGame.columns).toBe(4);
    });

    test('As bombas devem ser posicionadas em [0,0] e [2,1]', () => {
        expect(minefieldGame.field[0][0].value).toBe('*');
        expect(minefieldGame.field[0][0].isBomb).toBe(true);
        expect(minefieldGame.field[2][1].value).toBe('*');
        expect(minefieldGame.field[2][1].isBomb).toBe(true);
    });
});

describe('Testes relativos a identificação do número de bombas ao retor de cada elemento do campo', () => {
    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [0][1] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[0][1].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [0][2] seja 0', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[0][2].value).toBe(0);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [0][3] seja 0', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[0][3].value).toBe(0);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [1][0] seja 2', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[1][0].value).toBe(2);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [1][1] seja 2', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[1][1].value).toBe(2);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [1][2] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[1][2].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [1][3] seja 0', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[1][3].value).toBe(0);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [2][0] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[2][0].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [2][2] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[2][2].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [2][3] seja 0', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[2][3].value).toBe(0);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [3][0] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[3][0].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [3][1] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[3][1].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [3][2] seja 1', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[3][2].value).toBe(1);
    });

    test('Dado a entrada *........*...... num campo 4 por 4, espero que o elemento [3][3] seja 0', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        expect(minefieldGame.field[3][3].value).toBe(0);
    });
});

describe('Testes relativos às ações no seguinte campo 4 por 4: *........*......', () => {
    test('Ao "alternar" o elemento [0][0], espero que o resultado indique que "explodiu" e que "não é vencedor"', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        const toggleResult = minefieldGame.toggle(0, 0);
        expect(toggleResult.hasExploded).toBe(true);
        expect(toggleResult.isWinner).toBe(false);
        expect(minefieldGame.endOfGame).toBe(true);
    });

    test('Ao "alternar" o elemento [0][1], espero que o resultado indique que "não explodiu" e que "não é vencedor"', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        const toggleResult = minefieldGame.toggle(0, 1);
        expect(toggleResult.hasExploded).toBe(false);
        expect(toggleResult.isWinner).toBe(false);
        expect(minefieldGame.endOfGame).toBe(false);
    });

    test('Ao "alternar" todos os elementos que não são bombas, eu espero que o jogo finalize com vitória', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');

        for (let line = 0; line < 4; line++) {
            for (let column = 0; column < 4; column++) {
                const isKnownBomb = (line == 0 && column == 0) || (line == 2 && column == 1);
                if (!isKnownBomb)
                    minefieldGame.toggle(line, column);
            }
        }

        expect(minefieldGame.endOfGame).toBe(true);
        expect(minefieldGame.isWinner).toBe(true);
    });

    test.only('Ao "alternar" um elemento com valor igual a zero, todos os elementos em volta devem ser "alternados", de forma recursiva', () => {
        let minefieldGame = new MinefieldGame(4, 4, '*........*......');
        minefieldGame.toggle(0, 3);
        const toggledFieldItems = minefieldGame.field.flatMap(fieldLine => fieldLine)
            .filter(fieldItem => fieldItem.isToggled == true);
        expect(toggledFieldItems.length).toBe(10);
    });
});