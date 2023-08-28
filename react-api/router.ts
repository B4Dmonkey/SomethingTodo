import { Router } from "express";
import create from "./modules/create";
import readAll from "./modules/readAll";
import update from "./modules/update";
// import del from "./modules/delete";

const router = Router();

router.use("/", create);
router.use("/", readAll);
router.use("/", update);

export default router;