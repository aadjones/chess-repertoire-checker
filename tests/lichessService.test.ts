// src/tests/lichessService.test.ts
describe('fetchGames', () => {
    it('should fetch games without error', async () => {
      // Assuming fetchGames function is exported from lichessService.ts
      const { fetchGames } = require('../src/lichessService');
  
      // Replace 'testuser' with an actual Lichess username
      const games = await fetchGames('HarpSeal');
  
      // Here, you would include your assertions
      // For example, checking if games were fetched successfully
      expect(games).toBeDefined();
      expect(Array.isArray(games)).toBe(true);
    });
  });
  