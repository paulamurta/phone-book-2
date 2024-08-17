import express from "express";
import authRoutes from "./routes/auth.route";
import router from "./routes/contact.routes";
import cors from "cors";
import { setupSwagger } from "./config/swagger.config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(router);

setupSwagger(app);

app.listen(3009, () => {
  console.log("Running at port 3009");
});

export default app;
