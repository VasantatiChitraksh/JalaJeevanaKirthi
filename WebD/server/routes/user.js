import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;
    const user  = User.findOne({email})
    if(user){
        return res.json({message:" user already exist"})
    }

    const newUser = new User({
        username,
        email,
        password,
    })

    await newUser.save()
    return res.json({ status: "true" ,message : "Record registred"})


})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user  = User.findOne({email})
    if(!user){
        return res.json({message:" user is not registerd"})
    }
    
    if ( password != user.password){
        return res.json({message : "password is in correct"})
    }
    
    const token = jwt.sign({username: user.username}, 'jwttokenker', {expiresIn: '5h'})
    res.cookie('token',token,{httpOnly: true,maxAge: 1800000})
    return res.json({ status : true,message :"login successfully"})
})

export {router as UserRouter}