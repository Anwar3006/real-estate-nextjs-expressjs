import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
} from "../controllers/properties.controller";
import authMiddleware from "../middleware/authMiddleware";
import multer from "multer";

const propertiesRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

propertiesRouter.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);

propertiesRouter.get("/", getProperties);
propertiesRouter.get("/:propertyId", getPropertyById);

propertiesRouter.patch("/:propertyId", updateProperty);

export default propertiesRouter;
