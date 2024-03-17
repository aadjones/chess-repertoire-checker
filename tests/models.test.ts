import { Game } from '../src/models';

describe('Game class', () => {
    it('should correctly generate PGN for a complete game', () => {
        const game = new Game({
            id: 'game123',
            rated: true,
            variant: 'standard',
            speed: 'blitz',
            perf: 'blitz',
            createdAt: new Date('2022-01-01').getTime(),
            lastMoveAt: new Date('2022-01-01').getTime(),
            status: 'win', // Assuming this means White won
            players: {
                white: { user: { name: 'Alice', id: 'alice123' }, rating: 2100, ratingDiff: 10 },
                black: { user: { name: 'Bob', id: 'bob456' }, rating: 2050, ratingDiff: -10 },
            },
            moves: 'e4 e5 Nf3 Nc6 Bb5 a6',
        });

        const expectedPgn = [
            '[Event "standard"]',
            '[Site "https://lichess.org/game123"]',
            '[Date "2022-01-01"]',
            '[White "Alice"]',
            '[Black "Bob"]',
            '[Result "1-0"]',
            '',
            'e4 e5 Nf3 Nc6 Bb5 a6 1-0'
        ].join('\n');

        expect(game.generatePgn()).toBe(expectedPgn);
    });

    // Add more tests here for different scenarios, such as draws, unfinished games, etc.
});
