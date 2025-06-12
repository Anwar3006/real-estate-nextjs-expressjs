import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
} from "../controllers/applications.controller";

const applicationsRouter = Router();

applicationsRouter.post("/", authMiddleware(["tenant"]), createApplication);
applicationsRouter.patch(
  "/:applicationId/status",
  authMiddleware(["manager"]),
  updateApplicationStatus
);
applicationsRouter.get(
  "/",
  authMiddleware(["manager", "tenant"]),
  getApplications
);

export default applicationsRouter;
