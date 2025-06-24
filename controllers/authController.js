const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

// Create signToken function to create token for each usage
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({
      status: "fail",
      message: "Email already in use",
    });
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //Assign created token to token variable
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password!",
    });
  }
  // 2) Check if user exists && password is correct
  const user = User.findOne({ email }).select("+password");

  // Using instance method in userModel (correctPassword) for checking if it's the same || and Checking if there is the user in DB
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      message: "incorrect email or password",
    });
  }

  // Assign created token to token variable
  const token = signToken(user._id);

  // 3) If everything ok, send token to client
  res.status(200).json({
    status: "success",
    token,
  });
});
