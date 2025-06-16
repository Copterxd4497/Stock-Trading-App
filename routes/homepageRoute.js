const express = require("express");

const homepage = require("./../controllers/homepageController");
const router = express.Router();

router.route("/").get(homepage.homepage);

module.exports = router;
