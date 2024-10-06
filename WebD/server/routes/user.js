import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;
    // const user  = User.find({email})
    // if(user){
    //     return res.json({message:" user already exist"})
    // }

    const newUser = new User({
        username,
        email,
        password,
    })

    await newUser.save()
    return res.json({message : "Record registred"})


})

export {router as UserRouter}