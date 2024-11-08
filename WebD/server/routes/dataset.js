import express from "express";
import { Dataset } from "../models/Dataset";

const router = express.Router();

router.get("/searchdataset", async (req, res)=>{
    const { query } = res.query;

    const results = await Dataset.find({ title: { $regex: query, $options: 'i' } }).limit(5);
    
    return res.json(results);
})

router.post("/newdataset", async (req, res)=>{
    const { url, username, date, title, description } = req.body;

    const newDataset = new Dataset({
        url,
        username,
        date,
        title,
        description,
    })

    await newDataset.save();
    return res.json({status: "true", message: "Dataset Added"})
})