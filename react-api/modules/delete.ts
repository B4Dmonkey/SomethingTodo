import express from "express";
import * as db from "../db/crud"; // * Importing everything is probably bad practice, I'm just being lazy with renaming.
const router = express.Router();

const deleteTodo = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  await db.delRecord(idNumber);
  res.status(204).send();
};

router.delete("/:id", deleteTodo);

export default router;
