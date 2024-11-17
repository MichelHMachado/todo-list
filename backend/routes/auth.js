import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { hashPassword } from "../utils/hashPassword.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "User or email invalid" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(404).json({ message: "User or email invalid" });

    const { access_token } = generateTokens(user, res);

    res.json({ access_token });
  } catch (error) {
    console.error("Failed login: ", error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    if (!user) return res.status(404).json({ message: "Failed creating user" });

    const { access_token } = generateTokens(user, res);

    res.json({ access_token });
  } catch (error) {
    console.error("Failed signup: ", error);
  }
});

const generateTokens = (user, res) => {
  const access_token = jwt.sign(
    { uuid: user.uuid, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refresh_token = jwt.sign(
    {
      uuid: user.uuid,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { access_token };
};

export default router;
