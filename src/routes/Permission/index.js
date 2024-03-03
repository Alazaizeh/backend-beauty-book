import { Router } from "express";
import {
  getPermissions,
  addPermission,
  deletePermission,
  updatePermission,
} from "../../controllers/Permission/index.js";

const router = Router();

router.route("/").get(getPermissions);
router.route("/").post(addPermission);
router.route("/").delete(deletePermission);
router.route("/").put(updatePermission);

export default router;
