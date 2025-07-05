const express = require("express");

const purchaseStockController = require("./../controllers/purchaseStockCOntroller");
const router = express.Router();

router.route("/stock").post(purchaseStockController.purchaseStock);
router.route("/showPage").get(purchaseStockController.showPage);
router.route("/buy").get(purchaseStockController.buyStock);

module.exports = router;
