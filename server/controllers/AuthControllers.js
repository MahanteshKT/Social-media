import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

/*Register Controllers */
export const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    console.log(email);
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ error: "User Already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*LOGIN CONTROLLERS */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "user does not exist in database" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({ msg: "invalid Credentials!" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET
    );
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
