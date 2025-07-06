const SPStock = require("./../models/S&P500");
const catchAsync = require("./../utils/catchAsync");

exports.purchaseStock = async (req, res) => {
  try {
    const { initials, amount } = req.body;

    if (!initials || !amount) {
      return res.status(400).json({
        status: "error",
        message: "Both initials and amount are required.",
      });
    }

    const updatedProduct = await SPStock.findOneAndUpdate(
      { initials: initials, Available_Stock: { $gte: amount } },
      { $inc: { Available_Stock: -amount } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Stock not found or insufficient available stock.",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.showPage = (req, res) => {
  res.status(200).render("buy");
};

exports.buyStock = catchAsync(async (req, res) => {
  // Accept both 'stock' and 'stockSymbol' for robustness
  const stock = req.body.stock || req.body.stockSymbol;
  const quantity = req.body.quantity;

  if (!stock || !quantity) {
    return res.status(400).json({
      status: "error",
      message: "Both stock and quantity are required.",
    });
  }

  // Ensure quantity is a number
  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Quantity must be a positive number.",
    });
  }

  const bought = await SPStock.findOneAndUpdate(
    { initials: stock, Available_Stock: { $gte: qty } },
    { $inc: { Available_Stock: -qty } },
    { new: true }
  );

  if (!bought) {
    return res.status(404).json({
      status: "error",
      message: "Stock not found or insufficient available stock.",
    });
  }

  res.status(200).json({
    status: "success",
    data: bought,
  });
});
