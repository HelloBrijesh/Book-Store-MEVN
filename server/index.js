import express from "express";
import cors from "cors";
import { DEV_PORT, DB_URL, CLIENT_URL } from "./config";
import { errorHandler } from "./middlewares";
import routes from "./routes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
// app.use(cors());
app.set("trust proxy", 1);
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
// Database connection
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("db connected....");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || DEV_PORT;
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
