import express from "express";
import axios from "axios";
import { Blogs } from "../models/Blogs.js";

const router = express.Router();

router.get("/allblogs", async (req, res) => {
    try {
        const blogs = await Blogs.find();
        return res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ status: "false", message: "Failed to fetch blogs" });
    }
});


router.post("/newblog", async (req, res) => {
    try {
        const { username, title, content } = req.body;

        const newBlog = new Blogs({
            user: username,
            title,
            content,
        });

        await newBlog.save();

        try {
            const flaskResponse = await axios.post("http://localhost:5000/addData", {
                newdata: content,
            });

            if (flaskResponse.data) {
                return res.json({ status: "true", message: "Blog added and sent to knowledge base" });
            } else {
                return res.status(500).json({ status: "false", message: "Blog added but failed to update knowledge base" });
            }
        } catch (error) {
            console.error("Error communicating with Flask service:", error.message);
            return res.status(500).json({
                status: "false",
                message: "Blog added but failed to communicate with the knowledge base.",
            });
        }
    } catch (error) {
        console.error("Error in /newblog route:", error.message);
        return res.status(500).json({ status: "false", message: "An error occurred while adding the blog." });
    }
});

export {router as BlogsRouter}