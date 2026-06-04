import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json()); 

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/api/hello", (_req: Request, res: Response) => {
    res.json({ message: "Hello from the API!" });
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});