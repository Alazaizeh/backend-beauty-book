import { Router } from "express";
import {
  getServices,
  addService,
  deleteService,
  updateService,
  getServicesStatistics
} from "../../controllers/Service/index.js";

const router = Router();

router.route("/statistics").get(getServicesStatistics);
router.route("/delete/:id").delete(deleteService);
router.route("/").get(getServices);
router.route("/").post(addService);
router.route("/").put(updateService);

export default router;
