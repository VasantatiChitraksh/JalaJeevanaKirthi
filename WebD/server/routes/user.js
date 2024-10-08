import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;
    // const user  = User.findOne({email})
    // if(user){
    //     return res.json({message:" user already exist"})
    // }

    const hashpassword= await bcrypt.hash(password,10)

    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({ status: "true" ,message : "Record registred"})


})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: false, message: "User is not registered" });
    }

    const validpasswoed = await bcrypt.compare(password, user.password);
    if (!validpasswoed) {
        return res.json({ status: false, message: "Password incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'jwttokenker', { expiresIn: '5h' });

    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,    
        maxAge: 18000000,   
        sameSite: 'None',  
        secure: true,       
    });

    console.log({ status: true, message: "Login successful" }); // Log this
    return res.json({ status: true, message: "Login successful" });
});

export {router as UserRouter}