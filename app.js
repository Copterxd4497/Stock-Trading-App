const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const homepageRoute = require("./routes/homepageRoute");
const purchaseStockRoute = require("./routes/purchaseStockRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// // Set Pug as the view engine
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// // Serving static files
// app.use(express.static(path.join(__dirname, "public")));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", homepageRoute);
app.use("/purchase", purchaseStockRoute);
app.use("/users", userRoute);

// Handle undefined Routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
