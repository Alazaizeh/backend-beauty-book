import {
  getStaffData,
  updateStaffData,
  addStaffData,
  deleteStaffData,getStaffStatisticsData
} from "../../models/Staff/index.js";

export const getStaff = async (req, res) => {
  try {
    const { page, rows, filterName, filterSort } = req.query;

    const staffData = await getStaffData(
      Number(page),
      Number(rows),
      filterName,
      filterSort
    );

    res.status(200).json(staffData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getStaffStatistics = async (req, res) => {
  try {
    const staffData = await getStaffStatisticsData();
    res.status(200).json(staffData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const addStaff = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addStaffData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const staff_id = data.staff_id;

    if (!name || !description || !staff_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateStaffData(staff_id, data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const data = req.params;

    const staff_id = Number(data.id);
    if (!staff_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteStaffData(staff_id);
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
