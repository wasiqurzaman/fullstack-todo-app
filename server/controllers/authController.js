import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export default async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "username and password are required" });

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.status(401).json({ "message": "username not found" });   // unauthorized

    // evaluate the password
    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!passwordCorrect) return res.status(401).json({ "message": "invalid password" });

    const userForToken = {
      username: foundUser.username,
      id: foundUser._id
    }

    // create the jwt
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });

    // save refresh token with current user
    foundUser.refreshToken.token = refreshToken;
    foundUser.refreshToken.createdAt = new Date();
    const saved = await foundUser.save();

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: false, maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.json({ accessToken });

  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}