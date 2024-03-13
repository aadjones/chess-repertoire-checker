"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGames = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Fetches the recent games of a specified Lichess user.
 * @param username - The Lichess username to fetch games for.
 * @returns A promise that resolves with an array of game objects.
 * @throws {Error} Throws an error if the request to the Lichess API fails.
 */
const fetchGames = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://lichess.org/api/games/user/${username}`, {
            params: { max: 10 }, // Adjust based on how many games you want
            headers: { 'Accept': 'application/x-ndjson' }
        });
        return response.data.split('\n').filter(Boolean).map(JSON.parse);
    }
    catch (error) {
        console.error("Error fetching games from Lichess:", error);
        throw error;
    }
});
exports.fetchGames = fetchGames;
