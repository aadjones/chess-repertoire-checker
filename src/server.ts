import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/analyze', async (req: Request, res: Response) => {
    const { username, studyLinks } = req.body;
    // Placeholder for now
    res.json({ message: "Analysis will be implemented here." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
