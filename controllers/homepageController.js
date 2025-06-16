exports.homepage = (req, res) => {
  res.status(200).json({
    status: "success",
    data: 100,
  });
};
