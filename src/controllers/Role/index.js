import {
  getRolesData,
  updateRoleData,
  addRoleData,
  deleteRoleData,
} from "../../models/Role/index.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await getRolesData();
    
 
    const rolesData = roles.map((role) => {
      const allowedPages = new Set();
      const allowedActions = new Set();

      role.permissions.forEach((permission) => {
        if(permission.page)
        allowedPages.add(permission.page.name);
        if(permission.action)
        allowedActions.add(permission.action.name);
      });

      role["permissions"] = {
        pages: [...allowedPages],
        actions: [...allowedActions],
      };
      return role;
    });

    res.status(200).json(rolesData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addRole = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addRoleData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const role_id = data.role_id;

    if (!name || !description || !role_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateRoleData(role_id, data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const data = req.body;
    const role_id = data.role_id;

    if (!role_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteRoleData(role_id);
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
