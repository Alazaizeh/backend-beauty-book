import {
  getPermissionsData,
  updatePermissionData,
  addPermissionData,
  deletePermissionData,
} from "../../models/Permission/index.js";

export const getPermissions = async (req, res) => {
  try {
    const permissionsData = await getPermissionsData();
    res.status(200).json(permissionsData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addPermission  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addPermissionData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePermission  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const permission_id = data.permission_id;

    if (!name || !description || !permission_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updatePermissionData(permission_id,data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const data = req.body;
    const permission_id = data.permission_id;

    if (!permission_id ) {
      return res.status(400).json("Invalid data");
    }

    const result = await deletePermissionData(permission_id);
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
