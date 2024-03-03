import { Router } from "express";
import {
  getRoles,
  addRole,
  deleteRole,
  updateRole,
} from "../../controllers/Role/index.js";

const router = Router();

router.route("/").get(getRoles);
router.route("/").post(addRole);
router.route("/").delete(deleteRole);
router.route("/").put(updateRole);

export default router;
