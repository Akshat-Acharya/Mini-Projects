const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();

//sign up handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;
    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Nhi ho paya bhai",
        error: err,
      });
    }

    //create entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// login function

exports.login = async (req,res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Pls fill all the details",
      });
    }
    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "There is no registerd user",
      });
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    // verify password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      //password mismatched
      return res.status(403).json({
        success: false,
        message: "Password dint match",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Dikkat hai khi",
    });
  }
};
