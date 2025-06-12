import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getLeasePayment, getLeases } from "../controllers/leases.controller";

const leasesRouter = Router();

leasesRouter.get("/", authMiddleware(["manager", "tenant"]), getLeases);
leasesRouter.get(
  "/:leaseId/payments",
  authMiddleware(["manager", "tenant"]),
  getLeasePayment
);

export default leasesRouter;
