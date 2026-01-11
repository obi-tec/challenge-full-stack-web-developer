import express from "express";
import cors from "cors";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  }),
);

app.use(express.json());

setupSwagger(app);

app.use(routes);

app.use(errorHandler);

export default app;
