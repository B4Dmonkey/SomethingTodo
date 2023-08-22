import { Router } from "express";
import create from "./modules/create";
// import read from "./modules/read";
// import update from "./modules/update";
// import del from "./modules/delete";

const router = Router();

router.use("/", create);

export default router;