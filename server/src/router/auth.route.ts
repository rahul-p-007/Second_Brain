import express, { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
export const routes: Router = express.Router();

routes.post("/signup", signup as any);
routes.post("/login", login as any);
