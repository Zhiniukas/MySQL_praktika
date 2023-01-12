import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { getHome } from "./src/modules/getHome";
import { signIn } from "./src/modules/signIn";
import { isLoggedIn } from "./src/utils/isLoggedIn";

const app = express();
const PORT = process.env.port || 5001;

app.use(cors(), express.json(), cookieParser());

app.get("/user-settings", isLoggedIn, getHome);
app.post("/sign-in", signIn);

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
