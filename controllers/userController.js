const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validations");
const User = require("../models/userModel");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

//register a user
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //checking if the email is valid or not
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    //checking if email already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email already exists, try with a different email address",
      });
    }

    //checking for length of firstname lastName and password
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(last_name, 2, 30)) {
      return res.status(400).json({
        message: "last name must be between 2 and 20 characters",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "password must be 6 characters long",
      });
    }

    //hasing password before saving to database
    const cryptedPassword = await bcrypt.hash(password, 12);

    //validating username and generating a unique username
    const tempUsername = first_name + last_name;
    const newUsername = await validateUsername(tempUsername);

    //creating user in the database
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    //generate token for email verification
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    //token for login
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! Please activate your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//verifying email
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (check.verified === true) {
      return res.status(400).json({
        message: "This account is already activated",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Account activated succesfully !",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message:
        err.message === "jwt expired"
          ? "token expired . please try again"
          : err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // checking if email exists
    if (!user) {
      return res.status(400).json({
        message:
          "This email address you entered is not connected to an account",
      });
    }
    //checking if the password is correct
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
      });
    }

    //token for login
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Logged in successfully !",
    });
  } catch (err) {
    res.send(500).json({
      message: err.message,
    });
  }
};

//activate account
exports.activateAccount = async (req, res) => {
  try {
    //getting user & token from the reques body
    const validUser = req.user.id;
    const { token } = req.body;

    //getting user from the token
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);

    //chjecing whether the token belongs to the user who is logged in
    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }
    //checking whether already verified or not
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already activated." });
    } else {
      //updating the verified status
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resendverification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    }

    //generate token for email verification
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    //sending email
    sendVerificationEmail(user.email, user.first_name, url);

    return res
      .status(200)
      .json({ message: "Email verification link has been sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Account does not exist!" });
    } else {
      res.status(200).json({
        email: user.email,
        picture: user.picture,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
