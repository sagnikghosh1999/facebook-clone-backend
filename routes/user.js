const express = require("express");
const {
  register,
  activateAccount,
  login,
  resendverification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
} = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/resendverification", authUser, resendverification);
router.post("/finduser", findUser);
router.post("/sendresetpasswordcode", sendResetPasswordCode);
router.post("/validateresetcode", validateResetCode);
router.post("/changepassword", changePassword);

module.exports = router;