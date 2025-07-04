const express = require("express");

const purchaseStockController = require("./../controllers/purchaseStockCOntroller");
const router = express.Router();

router.route("/stock").post(purchaseStockController.purchaseStock);
router.route("/showPage").get(purchaseStockController.showPage);

module.exports = router;
