import { Router } from "express";

import {
  getManagerByClerkId,
  managerCreation,
  updateManager,
} from "../controllers/managers.controller";

const managersRouter = Router();

// Create a User in our database
managersRouter.post("/", managerCreation);
managersRouter.patch("/:clerkId", updateManager);
managersRouter.get("/:clerkId", getManagerByClerkId);

export default managersRouter;
