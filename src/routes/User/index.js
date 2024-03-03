import { Router } from "express";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
} from "../../controllers/User/index.js";

const router = Router();

router.route("/").get(getUsers);

router.route("/").post(addUser);
router.route("/").delete(deleteUser);
router.route("/update/status").post(updateUserStatus);
router.route("/update/role").post(updateUserRole);
router.route("/").put(updateUser);

export default router;
