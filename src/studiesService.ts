import { Study, StudyChapter } from './models'
import { fetchPgnData } from "./pgnService";

/**
 * Extracts the study ID from a given Lichess study URL.
 * 
 * @param studyUrl - The URL of the Lichess study from which to extract the study ID.
 * @returns The extracted study ID as a string if the URL is valid and contains an ID; otherwise, undefined.
 */
export function extractStudyId(studyUrl: string): string | undefined {
    const match = studyUrl.match(/lichess\.org\/study\/([a-zA-Z0-9]{8})/);
    return match ? match[1] : undefined;
  }
  
//   function parsePgnDataToStudy(pgnData: string, studyId: string): Study {
//     // Placeholder for parsing logic. This will depend on your specific needs and the structure of Study
//     const chapters = []; // Implement parsing logic to fill out chapters based on PGN data
  
//     return {
//       id: studyId,
//       chapters: chapters,
//     };
//   }

//   export async function fetchStudy(studyUrl: string): Promise<Study | null> {
//     const studyId = extractStudyId(studyUrl);
//     if (!studyId) {
//       console.error("Invalid study URL");
//       return null;
//     }
  
//     try {
//       const pgnData = await fetchPgnData(studyId);
//       if (pgnData === null) {
//         console.error("Failed to fetch PGN data");
//         return null;
//       }
  
//       // Now that we have the PGN data, parse it into a structured Study object
//       const study: Study = parsePgnDataToStudy(pgnData, studyId);
//       return study;
//     } catch (error) {
//       console.error("Failed to process study from Lichess:", error);
//       return null;
//     }
//   }
  