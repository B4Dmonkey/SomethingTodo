import express, { Request, Response } from "express";
import router from "./router";
import cors from 'cors'

const port = 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
  // * Might be a health check or something
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
