import axios from 'axios';
import { extractStudyId } from '../src/studiesService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
  
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

