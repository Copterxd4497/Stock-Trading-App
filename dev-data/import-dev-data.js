const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const SPStock = require("./../models/S&P500");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// READ JSON FILE
const detail_stocks = JSON.parse(
  fs.readFileSync(`${__dirname}/data/S&P500.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await SPStock.create(detail_stocks);

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await SPStock.deleteMany();

    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
