import express from "express";
import * as db from "../db/crud"; // * Importing everything is probably bad practice, I'm just being lazy with renaming.
const router = express.Router();

const readAll = async (req: express.Request, res: express.Response) => {
  const allTODOs = await db.readAll();
  res.status(200).send(allTODOs);
}

router.get("/", readAll);

export default router;