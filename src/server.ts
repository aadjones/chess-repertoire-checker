import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL path
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Chess Repertoire Checker!');
});

// Add other routes here
// Example: Analyze route
app.post('/analyze', async (req: Request, res: Response) => {
    // Your analysis logic here
    res.json({ message: "This is where analysis results will be returned." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
