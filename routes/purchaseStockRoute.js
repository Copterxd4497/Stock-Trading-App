const express = require("express");

const purchaseStockController = require("../controllers/purchaseStockCOntroller");
const router = express.Router();

router.route("/stock").post(purchaseStockController.purchaseStock);

module.exports = router;
