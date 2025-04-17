import express, { Router } from "express";

import {
  addnewContent,
  deletecontent,
  getallcontent,
  updatecontent,
} from "../controllers/contents.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
export const contentRoutes: Router = express.Router();

// For contents
contentRoutes.post("/content", isAuthenticated as any, addnewContent as any);
contentRoutes.get("/content", isAuthenticated as any, getallcontent as any);
contentRoutes.delete(
  "/content/:id",
  isAuthenticated as any,
  deletecontent as any
);
contentRoutes.put("/content/:id", isAuthenticated as any, updatecontent as any);
