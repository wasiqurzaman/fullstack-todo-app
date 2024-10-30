import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function handleRefreshToken(req, res, next) {

  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign({ username: foundUser.username, id: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });


  });
}