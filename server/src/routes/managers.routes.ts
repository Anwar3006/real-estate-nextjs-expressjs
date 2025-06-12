import { Router } from "express";

import {
  getManagerByClerkId,
  getManagerProperties,
  managerCreation,
  updateManager,
} from "../controllers/managers.controller";

const managersRouter = Router();

// Create a User in our database
managersRouter.post("/", managerCreation);
managersRouter.patch("/:clerkId", updateManager);
managersRouter.get("/:clerkId", getManagerByClerkId);
managersRouter.get("/:clerkId/properties", getManagerProperties);

export default managersRouter;
