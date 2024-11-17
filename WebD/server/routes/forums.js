import express from 'express';
import { Forum } from '../models/Forums.js'; // Adjust the path as needed
import { User } from "../models/User.js";

const router = express.Router();

// GET discussion for a specific date
router.get("/discussion", async (req, res) => {
    const { date } = req.query;
    try {
        const discussion = await Forum.findOne({ date });
        if (!discussion) {
            // Optionally, set a default topic if no discussion is found
            res.json({ topic: "No topic available for this date.", comments: [] });
        } else {
            res.json(discussion);
        }
    } catch (error) {
        console.error("Error fetching discussion:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST a new commen
router.post("/discussion/comment", async (req, res) => {
    const { date, comment } = req.body;
    console.log(req.body)
    const username = req.body.username; // Assume `req.user` contains logged-in user info

    try {
        // Find or create discussion for the date
        let discussion = await Forum.findOne({ date });
        if (!discussion) {
            discussion = new Forum({ date, topic: "Default topic for the date", comments: [] });
        }
        
        // Add the new comment
        discussion.comments.push({ user: username, text: comment, replies: [] });
        await discussion.save();
        
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST a reply to a comment
router.post('/discussion/comment/reply', async (req, res) => {
    const { date, commentId, reply } = req.body;

    if (!reply || !reply.text) {
        return res.status(400).json({ error: 'Reply text is required' });
    }

    try {
        const forum = await Forum.findOne({ date });
        const comment = forum.comments.id(commentId);

        comment.replies.push({
            user: reply.user,
            text: reply.text, // Make sure 'text' is being added here
        });

        await forum.save();
        res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
        console.error('Error posting reply:', error);
        res.status(500).json({ error: 'An error occurred while posting the reply' });
    }
});

// POST a new topic for a specific date
router.post('/discussion/topic', async (req, res) => {
    const { date, topic } = req.body;

    if (!date || !topic) {
        return res.status(400).json({ message: 'Date and topic are required.' });
    }

    try {
        let existingDiscussion = await Forum.findOne({ date });

        if (existingDiscussion) {
            return res.status(400).json({ message: 'Topic for this date already exists.' });
        }

        const newDiscussion = new Forum({ date, topic, comments: [] });
        await newDiscussion.save();

        res.status(201).json({ message: 'Topic created successfully.' });
    } catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





export { router as ForumsRouter };
