const SPStock = require("./../models/S&P500");
const catchAsync = require("./../utils/catchAsync");

exports.homepage = async (req, res) => {
  try {
    const homeStock = await SPStock.aggregate([
      {
        $sample: { size: 10 },
      },
    ]);

    res.status(200).render("home", { homeStock: homeStock });
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
exports.sectorAndIndustryPage = async (req, res) => {
  try {
    const { sector, industry } = req.query;

    // Build matchStage dynamically
    const matchStage = {};
    if (sector && sector !== "all") {
      matchStage.sector = sector;
    }
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

exports.getPE = async (req, res) => {
  try {
    const { PE } = req.params;
    const { sector, industry } = req.query;

    const matchStage = {};
    if (sector && sector !== "all") {
      matchStage.sector = sector;
    }
    if (industry && industry !== "all") {
      matchStage.industry = industry;
    }

    const selection = await SPStock.aggregate([
      { $match: matchStage },
      { $match: { PE: { $lt: Number(PE) } } },
      { $sample: { size: 10 } },
    ]);

    res.status(200).json({
      status: "success",
      data: selection,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const { price } = req.params;
    const { sector, industry } = req.query;

    const matchStage = {};
    if (sector && sector !== "all") {
      matchStage.sector = sector;
    }
    if (industry && industry !== "all") {
      matchStage.industry = industry;
    }

    const selection = await SPStock.aggregate([
      { $match: matchStage },
      { $match: { price: { $lt: Number(price) } } },
      { $sample: { size: 10 } },
    ]);

    res.status(200).json({
      status: "success",
      data: selection,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

//Get the initials or the full_name of That Stock
exports.initaisAndfull_name = async (req, res) => {
  try {
    const { initials, full_name } = req.query;

    // Build matchStage dynamically
    const matchStage = {};
    if (initials && initials !== "all") {
      matchStage.initials = initials;
    }
    if (full_name && full_name !== "all") {
      matchStage.full_name = full_name;
    }

    const selection = await SPStock.aggregate([
      { $match: matchStage },
      { $sample: { size: 1 } },
      {
        $project: { initials: 1, full_name: 1, _id: 0, sector: 1, industry: 1 },
      },
    ]);

    res.status(200).json(selection);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.refresh = catchAsync(async (req, res) => {
  const { country } = req.query;
  let refreshData;

  if (country) {
    refreshData = await SPStock.aggregate([
      { $match: { country: country } },
      { $sample: { size: 10 } },
    ]);
  } else {
    refreshData = await SPStock.aggregate([{ $sample: { size: 10 } }]);
  }

  res.status(200).json(refreshData);
});
