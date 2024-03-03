import { Router } from "express";
import {
  getActions,
  addAction,
  deleteAction,
  updateAction,
} from "../../controllers/Action/index.js";

const router = Router();

router.route("/").get(getActions);
router.route("/").post(addAction);
router.route("/").delete(deleteAction);
router.route("/").put(updateAction);

export default router;
