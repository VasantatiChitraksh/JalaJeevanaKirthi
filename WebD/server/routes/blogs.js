import express from "express";
import axios from "axios";
import { Blogs } from "../models/Blogs.js";

const router = express.Router();

router.post("/newblog", async (req, res)=>{
    const { username, text } = req.body;

    const newBlog = new Blogs({
        username,
        text,
    })

    await newBlog.save();
    const flaskResponse = await axios.post("http://localhost:5000/addData", {
        newdata: text,
    });

    if (flaskResponse.data) {
        return res.json({ status: "true", message: "Blog added and sent to knowledge base" });
    } else {
        return res.status(500).json({ status: "false", message: "Blog added but failed to update knowledge base" });
    }
})

export {router as BlogsRouter}