import jwt from "jsonwebtoken";

export type TUserPayload = { userName: string; issuedAt: number };

const jwtSecret = process.env.jwtSecret;

export const getHome = (req, res) => {
console.log(req.headers.authorization.replace("Bearer ",""));
  try {
    const payload: TUserPayload = jwt.verify(req.headers.authorization.replace("Bearer ",""), jwtSecret);

    res.send(`Welcome ${payload.userName}`).end();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }
};
