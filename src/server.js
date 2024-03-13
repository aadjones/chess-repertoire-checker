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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Define a route for the root URL path
app.get('/', (req, res) => {
    res.send('Welcome to the Chess Repertoire Checker!');
});
// Add other routes here
// Example: Analyze route
app.post('/analyze', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Your analysis logic here
    res.json({ message: "This is where analysis results will be returned." });
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
