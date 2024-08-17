import path from "path";

import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

export const setupSwagger = (app: Application) => {
  const swaggerFilePath = path.resolve(
    __dirname,
    "..",
    "..",
    "docs",
    "index.yaml"
  );

  const swaggerDocument = yaml.load(swaggerFilePath);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
