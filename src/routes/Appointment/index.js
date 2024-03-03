import { Router } from "express";
import {
  getAppointments,
  addAppointment,
  getAppointmentsStatistics,
  deleteAppointment,
  updateAppointment,
  getAppointmentByID,
  getTimeSlots,
} from "../../controllers/Appointment/index.js";

const router = Router();

router.route("/").get(getAppointments);
router.route("/search").post(getTimeSlots);
router.route("/book").post(addAppointment);
router.route("/details/:id").get(getAppointmentByID);
router.route("/statistics").get(getAppointmentsStatistics);
// router.route("/").delete(deleteAppointment);
// router.route("/").put(updateAppointment);

export default router;
