import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
//configure env
dotenv.config();

//databse config
connectDB();

//esmodeule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "./demowebsiteeeee/build")));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./demowebsiteeeee/build/index.html")
  );
});
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
