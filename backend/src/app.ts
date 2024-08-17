import express from "express";
import authRoutes from "./routes/auth.route";
import router from "./routes/contact.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(router);

app.listen(3009, () => {
  console.log("Running at port 3009");
});

export default app;
