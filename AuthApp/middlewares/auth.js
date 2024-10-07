// auth ,isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extract jwt token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token nhi hai",
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Wrong token",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is route only for students",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is route only for admin",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
