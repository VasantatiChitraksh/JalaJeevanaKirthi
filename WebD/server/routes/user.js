import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = User.findOne({ email });
  // if (user) {
  //   return res.json({ message: " user already exist" });
  // }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: "true", message: "Record registred" });
});

router.post("/login", async (req, res) => {
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
  const token = jwt.sign({ username: user.username }, "jwttokenker", {
    expiresIn: "5h",
  });

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 18000000,
    sameSite: "None",
    secure: true,
  });

  console.log({ status: true, message: "Login successful" }); // Log this
  return res.json({ status: true, message: "Login successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  

  try {
    const user = await  User.findOne({ email });
    if (!user) {
      return res.json({ message: " user not registered" });
    }
    const token = jwt.sign({ id: user._id }, "jwttokenker", { expiresIn: '1h' });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asta456as@gmail.com",
        pass: "xxev lykf puay iewp",
      },
    });

    var mailOptions = {
      from: "asta456as@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({message :"error sending email"})
      } else {
        return res.json( {status : true ,message :"Email sent"});
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res.json({ status: "true", message: "Record registred" });
});

router.post('/reset-password/:token', async(req,res) =>{
  const {token} = req.params;
  const {password}=req.body
  try {
    console.log("Token received:", token);
    const decoded = await jwt.verify(token,"jwttokenker");
    console.log("Decoded token:", decoded);
    const id = decoded.id;
    const  hashpassword = await bcrypt.hash(password,10)
    await User.findByIdAndUpdate({_id: id}, {password: hashpassword})
    return res.json({ status: "true", message: "update password " });
  } catch(err){
    return res.json({ message: "invalid token" })
  }
})

export { router as UserRouter };
