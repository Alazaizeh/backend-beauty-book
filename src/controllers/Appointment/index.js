import {
  getAppointmentsData,
  getAppointmentsStatisticsData,
  getAppointmentDataByID,
  updateAppointmentData,
  addAppointmentData,
  deleteAppointmentData,
  getTimeSlotsData,
  bookAppointment,
} from "../../models/Appointment/index.js";

export const getAppointments = async (req, res) => {
  try {
    const {
      page,
      rows,
      filterName,
      filterStatus,
      filterService,
      filterStartDate,
      filterEndDate,
    } = req.query;


    const appointmentsData = await getAppointmentsData(
      Number(page),
      Number(rows),
      filterName,
      filterStatus,
      filterService,
      filterStartDate,
      filterEndDate
    );

    res.status(200).json(appointmentsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTimeSlots = async (req, res) => {
  try {
    const { selectedDate, selectedService } = req.body;

    const appointmentsData = await getTimeSlotsData(
      selectedDate,
      selectedService
    );

    res.status(200).json(appointmentsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointmentsStatistics = async (req, res) => {
  try {
    const appointmentsData = await getAppointmentsStatisticsData();

    res.status(200).json(appointmentsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointmentByID = async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentsData = await getAppointmentDataByID(id);
    res.status(200).json(appointmentsData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addAppointment = async (req, res) => {
  try {
    const { selectedDate, selectedService } = req.body;

    if (!selectedDate || !selectedService) {
      return res.status(400).json("Invalid data");
    }

    const result = await bookAppointment(selectedDate, selectedService);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const appointment_id = data.appointment_id;

    if (!name || !description || !appointment_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateAppointmentData(appointment_id, data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const data = req.body;
    const appointment_id = data.appointment_id;

    if (!appointment_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteAppointmentData(appointment_id);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const state = async (req, res) => {
  res.json({
    message: "Working fine",
  });
};
