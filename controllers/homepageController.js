const SPStock = require("./../models/S&P500");

exports.homepage = async (req, res) => {
  try {
    const homeStock = await SPStock.aggregate([
      {
        $sample: { size: 10 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: homeStock,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//Select country
exports.countrypage = async (req, res) => {
  try {
    const country = req.params.id;

    const countryStock = await SPStock.aggregate([
      { $match: { country: country } },
      { $sample: { size: 10 } },
    ]);

    res.status(200).json({
      status: "success",
      data: countryStock,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//Select sector and industry
// GET /api/stocks/:sector/:industry?  — industry is optional
exports.sectorAndIndustryPage = async (req, res) => {
  try {
    const { sector, industry } = req.query;

    if (!sector) {
      return res.status(400).json({
        status: "error",
        message: "Sector is required",
      });
    }

    const matchStage = { sector: sector };
    if (industry && industry !== "all") {
      matchStage.industry = industry;
    }

    const selection = await SPStock.aggregate([
      { $match: matchStage },
      { $sample: { size: 10 } },
    ]);

    res.status(200).json({
      status: "success",
      data: selection,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
