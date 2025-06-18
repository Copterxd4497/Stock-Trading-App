const SPStock = require("./../models/S&P500");

exports.purchaseStock = async (req, res) => {
  try {
    const amount = req.body;

    res.status(200).json({
      status: "success",
      data: 100,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
