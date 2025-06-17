const mongoose = require("mongoose");
const { Schema } = mongoose;

const spStockSchema = new Schema({
  initials: {
    type: String,
    required: [true, "initial must have unique name!"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  full_name: {
    type: String,
    required: [true, "The stock must have a name itself!"],
    trim: true,
    unique: true,
    validate: {
      validator: function (key) {
        return key.split(" ").length < 10;
      },
    },
  },
  country: {
    type: String,
    required: [true, "The stock must have country!"],
    validate: {
      validator: function (key) {
        return key[0] === key[0].toUpperCase();
      },
    },
    trim: true,
    enum: ["Thailand", "USA", "China", "UK", "France"],
  },
  sector: {
    type: String,
    required: [true, "The stock must have a sector!"],
    trim: true,
    validate: {
      validator: function (key) {
        return key[0] === key[0].toUpperCase();
      },
    },
    enum: [
      "Communication Services",
      "Consumer Discretionary",
      "Consumer Staples",
      "Energy",
      "Financials",
      "Health Care",
      "Industrials",
      "Information Technology",
      "Materials",
      "Real Estate",
      "Utilities",
    ],
  },
  industry: {
    type: String,
    required: [true, "industry must have a industry!"],
    trim: true,
    validate: {
      validator: function (key) {
        return key[0] === key[0].toUpperCase();
      },
    },
    enum: [
      "Construction and Engineering",
      "Specialty Retail",
      "Chemicals",
      "Consumer Finance",
      "Health Care Providers and Services",
      "IT Services",
      "Oil, Gas and Consumable Fuels",
      "Food Products",
      "Real Estate Management and Development",
      "Media",
      "Metals and Mining",
      "Trading Companies and Distributors",
      "Hotels, Restaurants and Leisure",
      "Electronic Equipment, Instruments and Components",
      "Containers and Packaging",
      "Textiles, Apparel and Luxury Goods",
      "Automobile Components",
      "Independent Power and Renewable Electricity Producers",
    ],
  },
  PE: {
    type: Number,
    set: (v) => Math.round(v * 100) / 100,
  },
  price: {
    type: Number,
    set: (v) => Math.round(v * 100) / 100,
  },
  Available_Stock: {
    type: Number,
    set: (v) => Math.round(v),
  },
});

const SPStock = mongoose.model("SPStock", spStockSchema);
module.exports = SPStock;
