import { Router } from "express";
import {
  getPages,
  addPage,
  deletePage,
  updatePage,
} from "../../controllers/Page/index.js";

const router = Router();

router.route("/").get(getPages);
router.route("/").post(addPage);
router.route("/").delete(deletePage);
router.route("/").put(updatePage);

export default router;
