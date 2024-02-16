import express from "express";
import cors from "cors";
import path from "path";
import { config, configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import categoriesRouter from "./Router/CategoriesRouter.js";
import connection from "./Utils/Connection.js";
import seedRouter from "./Router/SeedRouter.js";
import boxRouter from "./Router/BoxRouter.js";
import userRouter from "./Router/UserRouter.js";
import swaggerUI from "swagger-ui-express";
import { specs } from "./Utils/Swagger.js";
import itemsRouter from "./Router/ItemsRouter.js";

const app = express();
const dotenv = configDotenv();
const conn = connection();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));

app.use(
  "/api/swagger",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.use("/api/boxes", boxRouter);
app.use("/api", seedRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", userRouter);
app.use("/api/get", itemsRouter);

app.listen(process.env.PORT, () => {
  console.log(`localhost ${process.env.PORT}`);
});
