import express, { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import {
  addnewContent,
  deletecontent,
  getallcontent,
  updatecontent,
} from "../controllers/contents.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
export const routes: Router = express.Router();

routes.post("/signup", signup as any);
routes.post("/login", login as any);
routes.post("/logout", logout as any);

// For contents
routes.post("/content", isAuthenticated as any, addnewContent as any);
routes.get("/content", isAuthenticated as any, getallcontent as any);
routes.delete("/content/:id", isAuthenticated as any, deletecontent as any);
routes.put("/content/:id", isAuthenticated as any, updatecontent as any);
