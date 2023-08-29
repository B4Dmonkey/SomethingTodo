import express, { Request, Response } from "express";
import router from "./router";
import cors from "cors"; // * Needed to add this since client and server are on different boxes in this architecture
import seed from "./db/seed";

const port = 3000;

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  // * Might be a health check or something
  res.send("Hello, world!");
});

seed();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
