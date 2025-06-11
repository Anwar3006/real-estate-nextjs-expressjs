import { Router } from "express";

import {
  getTenantByClerkId,
  tenantsCreation,
  updateTenant,
} from "../controllers/tenants.controller";

const tenantsRouter = Router();

// Create a User in our database
tenantsRouter.post("/", tenantsCreation);
tenantsRouter.patch("/:clerkId", updateTenant);
tenantsRouter.get("/:clerkId", getTenantByClerkId);

export default tenantsRouter;
