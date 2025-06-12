import { Router } from "express";

import {
  addFavoriteProperty,
  getTenantByClerkId,
  getTenantResidences,
  removeFavoriteProperty,
  tenantsCreation,
  updateTenant,
} from "../controllers/tenants.controller";

const tenantsRouter = Router();

// Create a User in our database
tenantsRouter.post("/", tenantsCreation);
tenantsRouter.post("/:clerkId/favorites/:propertyId", addFavoriteProperty);

tenantsRouter.patch("/:clerkId", updateTenant);

tenantsRouter.get("/:clerkId", getTenantByClerkId);
tenantsRouter.get("/:clerkId/current-residences", getTenantResidences);

tenantsRouter.delete("/:clerkId/favorites/:propertyId", removeFavoriteProperty);
export default tenantsRouter;
