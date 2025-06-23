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

module.exports = app;
