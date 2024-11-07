import express from "express";
import { Fish } from "../models/MarineData.js"; 
const router = express.Router();

router.get('/fishes', async (request, response) => {
    try {
        const fishes = await Fish.find({});
        response.status(200).json(fishes);
    } catch (error) {
        console.error("Error Fetching Data: ", error);
        response.status(500).json({ error: "An error occurred while fetching fish data." });
    }
});

export { router as FishRouter };
