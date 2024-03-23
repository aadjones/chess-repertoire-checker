import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL path
app.get("/", (req: Request, res: Response) => {
  // Send the HTML file to the client
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Add other routes here
// Example: Analyze route
app.post("/analyze", async (req: Request, res: Response) => {
  // Your analysis logic here
  res.json({ message: "This is where analysis results will be returned." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
