import { config } from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import userRouter from "./routes/userRouter";
import productRouter from "./routes/productRouter";

const cors = require("cors");
const cookieParser = require("cookie-parser");

config();

const app = express();
const port = 3000;

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

// Error Handler
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});
