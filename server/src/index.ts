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

/* SERVER */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
