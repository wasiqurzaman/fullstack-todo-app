import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function handleSignin(req, res) {
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
    res.json({ id: foundUser._id, accessToken });

  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

export async function handleSignup(req, res) {
  try {
    const { username, email, password } = req?.body;
    if (!username || !email || !password) return res.status(400).json({ "message": "username, email and password is required." })

    const foundUser = await User.findOne({ username });

    if (foundUser) return res.status(400).json({ "message": `username already exist. Try another username.` })

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const userForToken = {
      username: user.username,
      id: user._id
    }

    // create the jwt
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });

    // save refresh token with current user
    user.refreshToken.token = refreshToken;
    user.refreshToken.createdAt = new Date();
    const saved = await user.save();

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: false, maxAge: 2 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ user, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": "Something went wrong. User can not be created.", "error": `${err.message}` })
  }

}

export async function handleSignout(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ "refreshToken.token": refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
    return res.sendStatus(204);
  }

  // Delete the refresh token in the db
  foundUser.refreshToken.token = "";
  foundUser.refreshToken.createdAt = new Date();
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
  res.sendStatus(204);
}
