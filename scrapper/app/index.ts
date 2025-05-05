import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ApiRoutes from './routes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the TypeScript Node Server");
});
app.use('/api', ApiRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});