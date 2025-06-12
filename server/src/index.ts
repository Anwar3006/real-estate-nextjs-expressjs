import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

/* ROUTE IMPORT */
import tenantsRouter from "./routes/tenants.routes";
import managersRouter from "./routes/managers.routes";
import authMiddleware from "./middleware/authMiddleware";
import propertiesRouter from "./routes/properties.routes";
import leasesRouter from "./routes/leases.routes";
import applicationsRouter from "./routes/applications.routes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Register user router
app.use("/api/tenants", authMiddleware(["tenant"]), tenantsRouter);
app.use("/api/managers", authMiddleware(["manager"]), managersRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/leases", leasesRouter);
app.use("/api/applications", applicationsRouter);

/* SERVER */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
