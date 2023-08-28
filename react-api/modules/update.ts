import express from "express";
import * as db from "../db/crud";
const router = express.Router();

const updateItem = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  res.status(200).send("some response");
};

router.put("/:id", updateItem);

export default router;
