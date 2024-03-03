import { Router } from "express";
import {
  getSalons,
  findSalons,
  addSalon,
  deleteSalon,
  updateSalon,
  getSalonsStatistics
} from "../../controllers/Salon/index.js";

const router = Router();

router.route("/").get(getSalons);
router.route("/statistics").get(getSalonsStatistics);
router.route("/search").post(findSalons);
// router.route("/").post(addSalon);
// router.route("/").delete(deleteSalon);
// router.route("/").put(updateSalon);

export default router;
