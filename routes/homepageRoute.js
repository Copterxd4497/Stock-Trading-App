const express = require("express");

const homepage = require("./../controllers/homepageController");
const router = express.Router();

router.route("/").get(homepage.homepage);
router.route("/country/:id").get(homepage.countrypage);
router.route("/sector-industry").get(homepage.sectorAndIndustryPage);

module.exports = router;
