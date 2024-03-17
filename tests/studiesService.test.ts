import axios from 'axios';
import { extractStudyId, fetchPgnData } from '../src/studiesService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Suppress console output during tests
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    jest.restoreAllMocks();
  });
  
describe('extractStudyId', () => {
  it('should extract the study ID from a valid Lichess study URL', () => {
    const validUrl = 'https://lichess.org/study/14RZiFdX';
    const expectedId = '14RZiFdX';
    const studyId = extractStudyId(validUrl);
    expect(studyId).toEqual(expectedId);
  });

  it('should extract the study ID from a valid Lichess study URL that contains chapters', () => {
    const validUrl = 'https://lichess.org/study/14RZiFdX/zmjfXYWX';
    const expectedId = '14RZiFdX';
    const studyId = extractStudyId(validUrl);
    expect(studyId).toEqual(expectedId);
  });

  it('should return undefined for an invalid Lichess study URL', () => {
    const invalidUrl = 'https://lichess.org/other/abcdefgh';
    const studyId = extractStudyId(invalidUrl);
    expect(studyId).toBeUndefined();
  });
});

describe('fetchPgnData', () => {
  it('fetches and returns PGN data for a given study ID', async () => {
    const fakeStudyId = 'someStudyId';
    const fakePgnData = '1.e4 e5 2.Nf3 Nc6';
    mockedAxios.get.mockResolvedValue({ data: fakePgnData });

    const result = await fetchPgnData(fakeStudyId);
    
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://lichess.org/study/${fakeStudyId}.pgn`, expect.any(Object));
    expect(result).toBe(fakePgnData);
  });

  it('returns null if the API request fails', async () => {
    const fakeStudyId = 'someStudyId';
    mockedAxios.get.mockRejectedValue(new Error('API request failed'));
  
    const result = await fetchPgnData(fakeStudyId);
  
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://lichess.org/study/${fakeStudyId}.pgn`, expect.any(Object));
    expect(result).toBeNull();
  });
});

