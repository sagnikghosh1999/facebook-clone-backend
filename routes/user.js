const express = require("express");
const {
  register,
  activateAccount,
  login,
  resendverification,
  findUser,
} = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/resendverification", authUser, resendverification);
router.post("/finduser", findUser);

module.exports = router;
