import express from "express";
const router = express.Router();

const createPost = (req: express.Request, res: express.Response) => {
  const { title, description } = req?.body;

  res.status(200).send("some response");
};

router.post("/", createPost);

export default router;
