import express from "express"
import { Blogs } from "../models/Blogs.js";

const router = express.Router();

router.post("/newblog", async (req, res)=>{
    const { username, text } = req.body;

    const newBlog = new Blogs({
        username,
        text,
    })

    await newBlog.save();
    return res.json({ status: "true", message: "Blog added"});
})

export {router as BlogsRouter}