import { Router } from "express";
import {
  getStaff,
  addStaff,
  deleteStaff,
  updateStaff,getStaffStatistics
} from "../../controllers/Staff/index.js";

const router = Router();

router.route("/").get(getStaff);
router.route("/statistics").get(getStaffStatistics);
router.route("/").post(addStaff);
router.route("/delete/:id").delete(deleteStaff);
router.route("/").put(updateStaff);

export default router;
