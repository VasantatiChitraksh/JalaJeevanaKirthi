import express from "express";
import { Dataset } from "../models/Dataset.js";

const router = express.Router();

router.get("/searchdataset", async (req, res)=>{
    const { search, tags } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  try {
    const books = await Dataset.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "error fetching datasets" });
  }
})

router.get("/viewdatasets", async (req, res) => {
  try {
      const datasets = await Dataset.find({}).limit(5);
      res.json(datasets);
  } catch (err) {
      res.status(500).json({ error: "error retrieving datasets" });
  }
});

router.post("/newdataset", async (req, res)=>{
    console.log("insidde new dataset");
    const { url, username, date, title, description, tags } = req.body;

    const newDataset = new Dataset({
        url,
        username,
        date,
        title,
        description,
        // tags: tags.split(","),
    })

    await newDataset.save();
    return res.json({status: "true", message: "Dataset Added"})
})

export {router as DatasetRouter}