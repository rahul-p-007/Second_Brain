import express, { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import {
  addnewContent,
  deletecontent,
  getallcontent,
  updatecontent,
} from "../controllers/contents.controller";
export const routes: Router = express.Router();

routes.post("/signup", signup as any);
routes.post("/login", login as any);

// For contents
routes.post("/content", addnewContent as any);
routes.get("/content", getallcontent as any);
routes.delete("/content/:id", deletecontent as any);
routes.put("/content/:id", updatecontent as any);
