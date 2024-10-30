import jwt from "jsonwebtoken";

export default function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  console.log(authHeader);

  const token = authHeader.split(" ").at(1);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.sendStatus(403)  // invalid token
    console.log(decoded);
    req.user = decoded;
    next();
  })
}