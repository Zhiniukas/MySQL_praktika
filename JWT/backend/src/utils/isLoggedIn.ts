import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

export const isLoggedIn = (req, res, next) => {
  const accessToken = req.headers.authorization;

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    const jwtSecret = process.env.jwtSecret;
    payload = jwt.verify(accessToken.replace("Bearer ",""), jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  res.send(`Welcome ${payload.userName}`);
  return next();
};
