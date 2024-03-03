import {
  getSalonsData,
  findSalonsData,
  updateSalonData,
  addSalonData,
  deleteSalonData,
  getSalonsStatisticsData,
} from "../../models/Salon/index.js";

export const getSalons = async (req, res) => {
  try {
    const { page, rows, filterName, filterSort } = req.query;

 
    const salonsData = await getSalonsData(
      Number(page),
      Number(rows),
      filterName,
      filterSort
    );
    res.status(200).json(salonsData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findSalons = async (req, res) => {
  try {
    const data = req.body;
    const textfield = data.textfield;
    const salonsData = await findSalonsData(textfield);
    res.status(200).json(salonsData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSalonsStatistics = async (req, res) => {
  try {
    const salonsData = await getSalonsStatisticsData();

    res.status(200).json(salonsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addSalon = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addSalonData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateSalon = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const salon_id = data.salon_id;

    if (!name || !description || !salon_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateSalonData(salon_id, data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteSalon = async (req, res) => {
  try {
    const data = req.body;
    const salon_id = data.salon_id;

    if (!salon_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteSalonData(salon_id);
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
