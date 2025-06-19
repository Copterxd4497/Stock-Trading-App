const express = require("express");

const homepage = require("./../controllers/homepageController");
const router = express.Router();

router.route("/").get(homepage.homepage);
router.route("/eachStock").get(homepage.initaisAndfull_name);
router.route("/country/:id").get(homepage.countrypage);

router.route("/sector-industry").get(homepage.sectorAndIndustryPage);
router.route("/measure/:PE").get(homepage.getPE);
router.route("/price/:price").get(homepage.getPrice);

module.exports = router;
