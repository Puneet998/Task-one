const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");


// ================= SIGNUP =================
module.exports.Signup = async (req, res) => {
  try {

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ================= LOGIN =================
module.exports.Login = async (req, res) => {
  try {

    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log("here print 1")
    const user = await User.findOne({ email });
    console.log("2")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    console.log("Entered password:", password);
console.log("Hashed password from DB:", user.password);
     console.log("3")
    const auth = await bcrypt.compare(password, user.password);
console.log("Compare result:", auth);
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

         console.log("4")

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};