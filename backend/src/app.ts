import express from "express";
import cors from "cors";

import apiRoutes from "./routes";
import { setupSwagger } from "./config/swagger.config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(apiRoutes);

setupSwagger(app);

app.listen(3009, () => {
  console.log("Running at port 3009");
});

export default app;
