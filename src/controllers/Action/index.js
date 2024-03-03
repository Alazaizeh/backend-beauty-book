import {
  getActionsData,
  updateActionData,
  addActionData,
  deleteActionData,
} from "../../models/Action/index.js";

export const getActions = async (req, res) => {
  try {
    const actionsData = await getActionsData();
    res.status(200).json(actionsData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addAction  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addActionData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAction  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const action_id = data.action_id;

    if (!name || !description || !action_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updateActionData(action_id,data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAction = async (req, res) => {
  try {
    const data = req.body;
    const action_id = data.action_id;

    if (!action_id ) {
      return res.status(400).json("Invalid data");
    }

    const result = await deleteActionData(action_id);
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
