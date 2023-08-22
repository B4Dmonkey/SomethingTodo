import express from "express";
const router = express.Router();

const createPost = (req: express.Request, res: express.Response) => {
  console.log("still hitting this");
  const { title, description } = req?.body;

  console.log(`${title}, ${description}`);
  res.status(200).send("some response");
};

router.post("/", createPost);

export default router;
