import {
  getPagesData,
  updatePageData,
  addPageData,
  deletePageData,
} from "../../models/Page/index.js";

export const getPages = async (req, res) => {
  try {
    const pagesData = await getPagesData();
    res.status(200).json(pagesData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addPage  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    if (!name || !description) {
      return res.status(400).json("Invalid data");
    }

    const result = await addPageData(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePage  = async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const page_id = data.page_id;

    if (!name || !description || !page_id) {
      return res.status(400).json("Invalid data");
    }

    const result = await updatePageData(page_id,data);
    res.status(201).json(result);
  } catch (error) {
    console.error("add failed", error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePage = async (req, res) => {
  try {
    const data = req.body;
    const page_id = data.page_id;

    if (!page_id ) {
      return res.status(400).json("Invalid data");
    }

    const result = await deletePageData(page_id);
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
