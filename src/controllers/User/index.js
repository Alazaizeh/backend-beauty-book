import {
  getUsersData,
  updateUserData,
  updateUserRoleData,
  updateUserStatusData,
  addUserData,
  deleteUserData,
} from "../../models/User/index.js";

export const getUsers = async (req, res) => {
  try {
    const usersData = await getUsersData();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addUser  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addUserData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const user_id = data.user_id;

    if (!name || !description || !user_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateUserData(user_id,data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUserStatus  = async (req, res) => {
  try {
    const data = req.body;
    const isActive = data.isActive;
    const user_id = data.user_id;

    if (!user_id) {
      return res.status(400).json("Invalid data");
    }

     await updateUserStatusData(user_id,isActive);
    res.status(201).json("Updated Successfully");
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};
export const updateUserRole  = async (req, res) => {
  try {
    const data = req.body;
    const role_id = data.role_id;
    const user_id = data.user_id;

    if (!user_id) {
      return res.status(400).json("Invalid data");
    }

    await updateUserRoleData(user_id,role_id);
    res.status(201).json("Updated Successfully");
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const data = req.body;
    const user_id = data.user_id;

    if (!user_id ) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteUserData(user_id);
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
