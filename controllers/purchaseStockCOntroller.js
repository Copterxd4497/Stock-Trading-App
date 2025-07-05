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
  const { stock, quantity } = req.body;

  const bought = await SPStock.findOneANdUpdate(
    { initials: stock, Available_Stock: { $gte: quantity } },
    { $inc: { Available_Stock: -quantity } },
    { new: true }
  );
});
