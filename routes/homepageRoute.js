const express = require("express");

const homepage = require("./../controllers/homepageController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.route("/").get(homepage.homepage);
router.route("/loginPage").get(homepage.loginPage);

router.route("/profilePage").get(homepage.profilePage);

router.route("/eachStock").get(homepage.initaisAndfull_name);
router.route("/refresh").get(homepage.refresh);
router.route("/country/:id").get(homepage.countrypage);

router.route("/sector-industry").get(homepage.sectorAndIndustryPage);
router.route("/measure/:PE").get(homepage.getPE);
router.route("/price/:price").get(homepage.getPrice);

module.exports = router;
