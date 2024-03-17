import axios from 'axios';
import { fetchGames } from '../src/gamesService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchGames', () => {
  it('should fetch games without error', async () => {
    // Correctly formatted mock data based on your structure
    const mockData = `{"id":"q7ZvsdUF","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1514505150384,"lastMoveAt":1514505592843,"status":"draw","players":{"white":{"user":{"name":"Lance5500","title":"LM","patron":true,"id":"lance5500"},"rating":2389,"ratingDiff":4},"black":{"user":{"name":"TryingHard87","id":"tryinghard87"},"rating":2498,"ratingDiff":-4}},"opening":{"eco":"D31","name":"Semi-Slav Defense: Marshall Gambit","ply":7},"moves":"d4 d5...","clock":{"initial":300,"increment":3,"totalTime":420}}\n`;

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const games = await fetchGames('testuser');

    expect(games).toBeDefined();
    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0].id).toBe('q7ZvsdUF');
    // Add more assertions here to verify the structure of the returned data
  });
});