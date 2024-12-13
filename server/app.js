const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const cardRoutes = require("./routes/cardRoutes");
const authRoutes = require("./routes/authRoutes");
const equipmentRoutes = require("./routes/equipementRoutes");
const accordionRoutes = require("./routes/accordionRoutes");
const chartRoutes = require("./routes/chartRoutes");
const emailRoutes = require("./routes/emailRoutes");
const exportRoutes = require("./routes/exportRoutes");
const gridRoutes = require("./routes/gridRoutes");
const reportRoutes = require("./routes/reportRoutes");
const detailRoutes = require("./routes/detailRoutes");
//const schneiderRoutes = require("./routes/schneiderRoutes");

//app.use("/api/v1/schneider/", schneiderRoutes);
app.use("/api/v1/", detailRoutes);
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", equipmentRoutes);
app.use("/api/v1/", accordionRoutes);
app.use("/api/v1/", cardRoutes);
app.use("/api/v1/", chartRoutes);
app.use("/api/v1/", emailRoutes);
app.use("/api/v1/", exportRoutes);
app.use("/api/v1/", gridRoutes);
app.use("/api/v1/", reportRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
