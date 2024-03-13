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
// src/tests/lichessService.test.ts
describe('fetchGames', () => {
    it('should fetch games without error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming fetchGames function is exported from lichessService.ts
        const { fetchGames } = require('../src/lichessService');
        // Replace 'testuser' with an actual Lichess username
        const games = yield fetchGames('HarpSeal');
        // Here, you would include your assertions
        // For example, checking if games were fetched successfully
        expect(games).toBeDefined();
        expect(Array.isArray(games)).toBe(true);
    }));
});
