const { MinefieldGameGenerator } = require('../../js/MinefieldGameGenerator')

test('Um jogo de 4 por 5 com 3 bombas deve ser criado corretamente', () => {
    let minefieldGameGenerator = new MinefieldGameGenerator();
    let minefieldGame = minefieldGameGenerator.generateNewGame(4, 5, 3);
    expect(minefieldGame.field.length).toBe(4);
    const firstLine = minefieldGame.field[0];
    expect(firstLine.length).toBe(5);

    const fieldItems = minefieldGame.field.flatMap(line => line);
    expect(fieldItems.length).toBe(20);

    const bombFieldItems = fieldItems.filter(fieldItem => fieldItem.isBomb == true);
    expect(bombFieldItems.length).toBe(3);
});