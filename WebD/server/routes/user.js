import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: "true", message: "Record registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: false, message: "User is not registered" });
  }

  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
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

  console.log({ status: true, message: "Login successful" });
  return res.json({ status: true, message: "Login successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log("Email received in request:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with this email");
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, "jwttokenker", { expiresIn: '1h' });
    console.log("Reset token generated");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_specific_password",
      },
    });

    var mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.post('/reset-password/:token', async(req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, "jwttokenker");
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    
    await User.findByIdAndUpdate(id, { password: hashpassword });
    return res.json({ status: "true", message: "Password updated" });
  } catch (err) {
    return res.json({ message: "Invalid token" });
  }
});

router.get("/user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }, 'username');  // Fetch only the username field
    if (user) {
      return res.status(200).json({ username: user.username });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Error fetching user data" });
  }
});

export { router as UserRouter };
