const { promisify } = require("util");

const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
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
    passwordChangeAt: req.body.passwordChangeAt,
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
  const user = await User.findOne({ email }).select("+password");

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

//Checking if JWT token is valid
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Optionally, you can also check cookies here if you use them
  // if (!token && req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    return next(
      new appError(
        "You are not logged in! Please log in first to get access",
        401
      )
    );
  }

  // 2) Verification token (💥💥 this sector must connect to globalHandling in terms of sending error to the production)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belonging to this token no longer exists.", 401)
    );
  }

  // // 4) Check if user changed password after the JWT token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new appError("User recently changed password! Please log in again.", 401)
  //   );
  // }

  // Grant access to protected route
  req.user = currentUser;
  next();
});
