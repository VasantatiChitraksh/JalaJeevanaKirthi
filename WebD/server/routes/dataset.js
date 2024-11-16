import express from "express";
import { Dataset } from "../models/Dataset.js";

const router = express.Router();

// Get all unique tags
router.get("/tags", async (req, res) => {
  try {
    const tags = await Dataset.distinct("tags");
    res.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ error: "Error fetching tags" });
  }
});

// Search for datasets by title and/or tags
router.get("/searchdataset", async (req, res) => {
  const { search, tags } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  try {
    const datasets = await Dataset.find(query);
    res.json(datasets);
  } catch (err) {
    console.error("Error fetching datasets:", err);
    res.status(500).json({ error: "Error fetching datasets" });
  }
});

// View a limited number of datasets
router.get("/viewdatasets", async (req, res) => {
  try {
    const datasets = await Dataset.find({}).limit(5);
    res.json(datasets);
  } catch (err) {
    console.error("Error retrieving datasets:", err);
    res.status(500).json({ error: "Error retrieving datasets" });
  }
});

// Add a new dataset
router.post("/newdataset", async (req, res) => {
  console.log("Inside new dataset");
  const { url, username, date, title, description, tags } = req.body;

  const newDataset = new Dataset({
    url,
    username,
    date,
    title,
    description,
    tags: typeof tags === "string" ? tags.split(",") : tags,
  });

  try {
    await newDataset.save();
    res.json({ status: "true", message: "Dataset added successfully" });
  } catch (err) {
    console.error("Error adding new dataset:", err);
    res.status(500).json({ error: "Error adding new dataset" });
  }
});

export { router as DatasetRouter };
