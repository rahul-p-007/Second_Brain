import express, { Application } from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import { connectDB } from "./db/connection/dbConnect";
import { routes } from "./router/auth.route";
import { contentRoutes } from "./router/content.route";
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookie());

app.use("/v1/auth", routes);
app.use("/api/v1", contentRoutes);

connectDB(app);
