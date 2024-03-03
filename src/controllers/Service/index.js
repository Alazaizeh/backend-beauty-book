import {
  getServicesData,
  updateServiceData,
  addServiceData,
  deleteServiceData,getServicesStatisticsData
} from "../../models/Service/index.js";

export const getServices = async (req, res) => {
  try {
    const { page, rows, filterName, filterSort } = req.query;
    const servicesData = await getServicesData(
      Number(page),
      Number(rows),
      filterName,
      filterSort
    );

    res.status(200).json(servicesData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getServicesStatistics = async (req, res) => {
  try {
    const servicesData = await getServicesStatisticsData();
    res.status(200).json(servicesData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addService  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addServiceData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateService  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const service_id = data.service_id;

    if (!name || !description || !service_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateServiceData(service_id,data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const data = req.params;
    const service_id = Number(data.id);

    if (!service_id ) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteServiceData(service_id);
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
